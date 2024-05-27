import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';

const useMacetas = () => {
  const [macetas, setMacetas] = useState([]);

  useEffect(() => {
    const fetchMacetas = async () => {
      const querySnapshot = await getDocs(collection(db, "macetas"));
      const macetasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMacetas(macetasData);
    };

    fetchMacetas();
  }, []);

  const agregarMaceta = async (maceta) => {
    let imageUrl = "";
    if (maceta.imagen) {
      const storageRef = ref(storage, `macetas/${maceta.imagen.name}`);
      await uploadBytes(storageRef, maceta.imagen);
      imageUrl = await getDownloadURL(storageRef);
    }
    const newMaceta = { ...maceta, imagen: imageUrl };
    const docRef = await addDoc(collection(db, "macetas"), newMaceta);
    setMacetas([...macetas, { id: docRef.id, ...newMaceta }]);
  };

  const actualizarMaceta = async (id, maceta) => {
    let imageUrl = maceta.imagen;
    if (maceta.imagen instanceof File) {
      const storageRef = ref(storage, `macetas/${maceta.imagen.name}`);
      await uploadBytes(storageRef, maceta.imagen);
      imageUrl = await getDownloadURL(storageRef);
    }
    const updatedMaceta = { ...maceta, imagen: imageUrl };
    const macetaRef = doc(db, "macetas", id);
    await updateDoc(macetaRef, updatedMaceta);
    setMacetas(macetas.map(m => (m.id === id ? { id, ...updatedMaceta } : m)));
  };

  const eliminarMaceta = async (id) => {
    await deleteDoc(doc(db, "macetas", id));
    setMacetas(macetas.filter(m => m.id !== id));
  };

  return {
    macetas,
    agregarMaceta,
    actualizarMaceta,
    eliminarMaceta
  };
};

export default useMacetas;
