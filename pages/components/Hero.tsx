import { Text, Flex } from "@chakra-ui/react";

export default function Hero() {
    return (
        <Flex
            justify="space-between"
            align="center"
            p="2rem"
            m="4rem"
            color="#0EA5E9"
        >
            <Text
                fontSize="2rem"
            >
                Stay Safe
            </Text>
            <Text
                fontSize="2rem"
            >
                Save Time
            </Text>
            <Text
                fontSize="2rem"
            >
                Protect Yourself
            </Text>
        </Flex>
    )
}