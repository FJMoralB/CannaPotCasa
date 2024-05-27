import { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

const useMacetas = () => {
    const [macetas, setMacetas] = useState([]);

    useEffect(() => {
        const cargarMacetas = async () => {
            const usuario = auth.currentUser;
            if (usuario) {
                const q = query(collection(firestore, "macetas"), where("usuarioId", "==", usuario.uid));
                const snapshot = await getDocs(q);
                const macetasGuardadas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMacetas(macetasGuardadas);
            }
        };

        cargarMacetas();
    }, []);

    const agregarMaceta = async (nuevaMaceta) => {
        const usuario = auth.currentUser;
        if (usuario) {
            await addDoc(collection(firestore, "macetas"), { ...nuevaMaceta, usuarioId: usuario.uid });
            cargarMacetas();
        }
    };

    const actualizarMaceta = async (macetaEditandoId, macetaActualizada) => {
        const usuario = auth.currentUser;
        if (usuario && macetaEditandoId) {
            const macetaRef = doc(firestore, "macetas", macetaEditandoId);
            await updateDoc(macetaRef, macetaActualizada);
            cargarMacetas();
        }
    };

    return { macetas, agregarMaceta, actualizarMaceta };
};

export default useMacetas;
