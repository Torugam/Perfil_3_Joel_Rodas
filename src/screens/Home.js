import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { auth, database } from '../config/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import CardProductos from '../components/CardProductos';
 
const Home = ({ navigation }) => {
    const [productos, setProductos] = useState([]);
 
    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.replace('Login');
            }
        });
 
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setProductos(docs);
        });
 
        return () => {
            unsubscribeAuth();
            unsubscribeSnapshot();
        };
    }, []);
 
    const goToAdd = () => {
        navigation.navigate('Add');
    };
 
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.replace('Login');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
 
    const renderItem = ({ item }) => (
        <CardProductos
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            imagen={item.imagen}
        />
    );
 
    return (
        <View style={styles.container}>
            <FlatList
                data={productos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity onPress={goToAdd} style={styles.addButton}>
                <Text style={styles.addButtonText}>Agregar producto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    addButton: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#d32f2f',
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
 
export default Home;