import { chakra, Flex, Stack, HStack, Image, Text, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { RadioGroup, Radio, Button } from '@chakra-ui/react';
import Header from './components/Header';
import { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

export default function Verify() {

    const [title, setTitle] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [func, setFunc] = useState<string>('');
    const [industry, setIndustry] = useState<string>('');
    const [salaryLow, setSalaryLow] = useState<number>(50000);
    const [salaryHigh, setSalaryHigh] = useState<number>(70000);
    const [profile, setProfile] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [requirements, setRequirements] = useState<string>('');
    const [benefits, setBenefits] = useState<string>('');
    const [employementType, setEmploymentType] = useState<string>('');
    const [telecommuting, setTelecommuting] = useState<string>('');
    const [logo, setLogo] = useState<string>('');
    const [questions, setQuestions] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [education, setEducation] = useState<string>('');
    const router: NextRouter = useRouter();

    function handler() {
        router.push({
            pathname: "/result",
            query: {
                title: title,
                location: location,
                department: department,
                salary_range: `${salaryLow}-${salaryHigh}`,
                company_profile: profile,
                description: description,
                requirements: requirements,
                benefits: benefits,
                telecommuting: telecommuting,
                has_company_logo: logo,
                has_questions: questions,
                employment_type: employementType,
                required_experience: experience,
                required_education: education,
                industry: industry,
                function: func
            }
        });
    }

    return (
        <chakra.div 
            display="flex" 
            flexDirection="column" 
            minHeight="100vh"
            bg="#0F172A"
        >
            <Header />
            <Flex justify="space-evenly" align="center" p="1rem" flex="1">
                <Stack display={["none", "none", "none", "block", "block"]} boxSize={["250px", "300px", "300px", "400px", "600px"]} p="1rem">
                    <Image src="/resume.svg" boxSize={["250px", "300px", "300px", "300px", "400px"]}/>
                    <Text color="#0EA5E9" fontSize={["1rem", "1.25rem", "1.5rem", "1.5rem", "2rem"]}>
                        Empower your job search with our intelligent AI model.
                        Simply input the job posting details and recieve instant results!
                    </Text>
                </Stack>
                <Flex height={["625px", "625px", "625px", "625px", "625px"]} width={["400px", "400px", "400px", "450px", "550px"]} flexDir="column" p="1rem" bg="#334155" gap="1rem" borderRadius="2rem" color="#0EA5E9">
                    <Text color="#0EA5E9" align="center" fontSize={["1rem", "1.25rem", "1.25rem", "1.5rem", "1.5rem"]}>
                        Tell us about the position you are applying to.
                    </Text>
                    <Tabs isFitted variant='enclosed' height={["425px", "425px", "425px", "450px", "475px"]}>
                        <TabList mb='1em'>
                            <Tab>Company Information</Tab>
                            <Tab>Logistical Information</Tab>
                            <Tab>Closing Information</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <FormControl>
                                    <Stack spacing="0.25rem">
                                        <FormLabel>Title</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='Software Engineer Intern' 
                                            onChange={e => setTitle(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                        <FormLabel>Location</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='Minneapolis, MN' 
                                            onChange={e => setLocation(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                        <FormLabel>Department</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='Medical Devices' 
                                            onChange={e => setDepartment(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                        <FormLabel>Function</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='Other' 
                                            onChange={e => setFunc(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                        <FormLabel>Industry</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='Healthcare' 
                                            onChange={e => setIndustry(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                    </Stack>
                                </FormControl>
                            </TabPanel>
                            <TabPanel>
                                <FormControl>
                                    <Stack spacing="0.25rem">
                                        <FormLabel>Description</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='Optum is a global organization that delivers care, aided by technology to help ...'
                                            onChange={e => setDescription(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                        <FormLabel>Salary Range</FormLabel>
                                        <HStack spacing="24px">
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    color='gray.300'
                                                    fontSize='1.2em'
                                                >
                                                $
                                                </InputLeftElement>
                                                <Input 
                                                    type='number' 
                                                    placeholder='Starting Amount' 
                                                    value={salaryLow}
                                                    onChange={e => {
                                                        setSalaryLow((prev: number) => {
                                                            const currVal = parseInt(e.target.value);
                                                            if (currVal < 0) return 0;
                                                            if (currVal > salaryHigh) {
                                                                setSalaryHigh(currVal);
                                                            }
                                                            return isNaN(currVal) ? 0 : currVal;
                                                        })
                                                    }}
                                                />
                                            </InputGroup>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    color='gray.300'
                                                    fontSize='1.2em'
                                                >
                                                $
                                                </InputLeftElement>
                                                <Input 
                                                    type='number'
                                                    placeholder='Ending Amount' 
                                                    value={salaryHigh}
                                                    onChange={e => {
                                                        setSalaryHigh((prev: number) => {
                                                            const currVal = parseInt(e.target.value);
                                                            console.log(currVal);
                                                            if (currVal < 0) return 0;
                                                            if (currVal < salaryLow) {
                                                                setSalaryLow(currVal);
                                                            }
                                                            return isNaN(currVal) ? 0 : currVal;
                                                        })
                                                    }}
                                                />
                                            </InputGroup>
                                        </HStack>
                                        <FormLabel>Company Profile</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='Our mission at United Health Group is to help people live healthier lives and ...'
                                            onChange={e => setProfile(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                        <FormLabel>Requirements</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='Skilled in UI Development technologies such as HTML, CSS, JavaScript and ...'
                                            onChange={e => setRequirements(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                        <FormLabel>Benefits</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder='The compensation range and benefits for this position are based ...'
                                            onChange={e => setBenefits(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                    </Stack>
                                </FormControl>
                            </TabPanel>
                            <TabPanel>
                                <FormControl>
                                    <Stack spacing="0.25rem">
                                        <FormLabel>Employment Type</FormLabel>
                                        <RadioGroup defaultValue='' onChange={e => setEmploymentType(e)}>
                                            <HStack spacing='24px' mt="0.25rem">
                                                <Radio value='' size={["sm", "sm", "sm", "md", "md"]}>Not Sure</Radio>
                                                <Radio value='Part-time' size={["sm", "sm", "sm", "md", "md"]}>Part-time</Radio>
                                                <Radio value='Full-time' size={["sm", "sm", "sm", "md", "md"]}>Full-time</Radio>
                                            </HStack>
                                        </RadioGroup>
                                        <FormLabel>Telecommuting</FormLabel>
                                        <RadioGroup defaultValue='' onChange={e => setTelecommuting(e)}>
                                            <HStack spacing='24px'>
                                                <Radio value='' size={["sm", "sm", "sm", "md", "md"]}>Not Sure</Radio>
                                                <Radio value='1' size={["sm", "sm", "sm", "md", "md"]}>No</Radio>
                                                <Radio value='0' size={["sm", "sm", "sm", "md", "md"]}>Yes</Radio>
                                            </HStack>
                                        </RadioGroup>
                                        <FormLabel>Has Company Logo?</FormLabel>
                                        <RadioGroup defaultValue='' onChange={e => setLogo(e)}>
                                            <HStack spacing='24px'>
                                                <Radio value='' size={["sm", "sm", "sm", "md", "md"]}>Not Sure</Radio>
                                                <Radio value='1' size={["sm", "sm", "sm", "md", "md"]}>No</Radio>
                                                <Radio value='0' size={["sm", "sm", "sm", "md", "md"]}>Yes</Radio>
                                            </HStack>
                                        </RadioGroup>
                                        <FormLabel>Lists Required Questions?</FormLabel>
                                        <RadioGroup defaultValue='' onChange={e => setQuestions(e)}>
                                            <HStack spacing='24px'>
                                                <Radio value='' size={["sm", "sm", "sm", "md", "md"]}>Not Sure</Radio>
                                                <Radio value='1' size={["sm", "sm", "sm", "md", "md"]}>No</Radio>
                                                <Radio value='0' size={["sm", "sm", "sm", "md", "md"]}>Yes</Radio>
                                            </HStack>
                                        </RadioGroup>
                                        <FormLabel>Required Experience</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder="Mid-Senior level" 
                                            onChange={e => setExperience(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                        <FormLabel>Required Education</FormLabel>
                                        <Input 
                                            type='text' 
                                            placeholder="Bachelor's Degree" 
                                            onChange={e => setEducation(e.target.value)}
                                            size={["xs", "sm", "sm", "md", "md"]}
                                        />
                                    </Stack>
                                </FormControl>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Flex justify="center">
                        <Button 
                            fontSize="1.25rem" 
                            color="#0F172A"
                            bg="#0EA5E9" 
                            type="submit" 
                            p="1rem" 
                            pl="1.5rem" 
                            pr="1.5rem"
                            onClick={handler}
                        >
                            Submit   
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </chakra.div>
    ); 
}