import { chakra } from '@chakra-ui/react';
import Header from './components/Header';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Result() {
    const router = useRouter();

    useEffect(() => {
        if (!router.query || Object.keys(router.query).length === 0) {
            router.push("/");
        }
    }, [router]);

    async function analysis(params: object) {
        const response = await fetch("/api/analyzer", {
            method: "POST",
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error("Failed to make post");
        }

        const result = await response.json();
        console.log(result);
    }

    useEffect(() => {
        analysis(router.query);
    });



    return (
        <chakra.div 
            display="flex" 
            flexDirection="column" 
            minHeight="100vh"
            bg="#0F172A"
        >
            <Header />

        </chakra.div>
    ); 
}
