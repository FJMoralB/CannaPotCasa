import { useState, useEffect } from 'react';
import axios from 'axios';

const useMacetas = () => {
  const [macetas, setMacetas] = useState([]);

  useEffect(() => {
    const fetchMacetas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/macetas');
        setMacetas(response.data);
      } catch (error) {
        console.error('Error fetching macetas:', error);
      }
    };

    fetchMacetas();
  }, []);

  return macetas;
};

export default useMacetas;
