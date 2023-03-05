import { chakra } from '@chakra-ui/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Main from './components/Main';

export default function Home() {
    return (
        <chakra.div 
            display="flex" 
            flexDirection="column" 
            minHeight="100vh"
            bg="#0F172A"
        >
            <Header />
            <Hero />
            <Main />
        </chakra.div>
    ); 
}
