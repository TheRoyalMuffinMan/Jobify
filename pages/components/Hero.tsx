import { Container, Stack, Flex, Box, Heading, Text, Image, useColorModeValue, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { useState } from "react";
import Blob from './Blob';

const Hero = () => {
    const router = useRouter();
    const [input, setInput] = useState('')
    const handleInputChange = (e: any) => setInput(e.target.value)
    const post = async (e: any) => {
        const response = await fetch("/api/hackathons", {
            method: "POST",
            body: JSON.stringify({ hackathon_name: input })
        });

        if (!response.ok) {
            throw new Error("Failed to make post");
        }

        setInput('');
    }


    return (
        <Container maxW={'7xl'}>
            <Stack
                align={'center'}
                spacing={ { base: 8, md: 10 } }
                py={ { base: 20, md: 28 } }
                direction={ { base: 'column', md: 'row' } }
            >
                <Stack flex={1} spacing={ { base: 5, md: 10 } }>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={ { base: '3xl', sm: '4xl', lg: '6xl' } }
                    >
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={ {
                                content: "''",
                                width: 'full',
                                height: '20%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'green.400',
                                zIndex: -1,
                            } }
                        >
                            NextJS + ChakraUI
                        </Text>
                        <br />
                        <Text as={'span'} color={'red.400'}>
                            Template By Andy
                        </Text>
                        <br />
                        <Button colorScheme='teal' size='md' onClick={() => router.push('/')}>
                            Home
                        </Button>
                        <br />
                        <FormControl isRequired>
                            <FormLabel>Hackathon</FormLabel>
                            <Input placeholder='HackViolet' value={input} onChange={handleInputChange}/>
                            <Button colorScheme='teal' onClick={post}>
                                Submit
                            </Button>
                        </FormControl>
                    </Heading>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}
                >
                    <Blob
                        w={'150%'}
                        h={'150%'}
                        position={'absolute'}
                        top={'-20%'}
                        left={0}
                        zIndex={-1}
                        color={useColorModeValue('cyan.50', 'cyan.400')}
                    />
                    <Box
                        position={'relative'}
                        height={'300px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}
                    >
                    <Image
                        alt={'Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={'100%'}
                        src="https://og-image.vercel.app/**Next.js%20Chakra**%20Starter.png?theme=light&md=1&fontSize=125px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fraw.githubusercontent.com%2Fchakra-ui%2Fchakra-ui%2Fbf775929a6d73a3aa69e44d5d38542449871475c%2Flogo%2Flogomark-colored.svg"
                    />
                    </Box>
                </Flex>
            </Stack>
        </Container>
    );
}

export default Hero;
