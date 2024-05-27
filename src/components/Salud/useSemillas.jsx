import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useSemillas = () => {
  const [semillas, setSemillas] = useState([]);

  useEffect(() => {
    const fetchSemillas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "semillas"));
        const semillasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSemillas(semillasData);
      } catch (error) {
        console.error("Error fetching semillas: ", error);
      }
    };

    fetchSemillas();
  }, []);

  return {
    semillas
  };
};

export default useSemillas;
