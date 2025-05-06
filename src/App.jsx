import React, { Fragment, useEffect, useState } from 'react'
import {
  Avatar, Box, Button, Center, Flex, Grid,
  Heading, Spacer, Text, useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { Navigation, Footer } from 'personal-shared-layout';
import Loading from './components/Loading';

function Badges() {

  const isMobile = useBreakpointValue({ base: true, md: false });

  const [data, setData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = isMobile ? 4 : 6; // Number of items per page

  // Fetch data from a public API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "/data/badges.json"
        ); // Replace with your public data URL
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const lastPage = Math.ceil(data.length / itemsPerPage);

  // Change pages
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // ** pointing to the badges element
    const badgesElement = document.getElementById('Badges');
    if (badgesElement) {
      badgesElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Handle credential url reference link
  const handleCredentialUrl = (url) => {
    window.open(url, "_blank");
  }

  // Error handling and loading states
  if (loading) return <Loading />
  if (error) return <p>Something went wrong</p>;

  return (
    <Fragment>


      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Navigation />
      </motion.div>

      <Box as="section" id="about" py={20}>
        <Box className="stars" />
        <Box className="stars2" />
        <Box className="stars3" />


        {/* Heading and subtext transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box py={{ base: 8, md: 12 }} mb={20} borderBottomWidth={1} borderColor="#536189">
            <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
              <Heading id='Badges' as="h1" size={{ base: 'xl', md: '2xl' }} color="#faf9ff" mb={4}>
                Badges
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="#faf9ff" maxW="2xl">
                These badges represent the certificates I’ve earned through my journey of learning across a variety of online platforms. Each one showcases the knowledge and skills I've gained along the way, marking milestones in my continuous growth.
              </Text>
            </Box>
          </Box>
        </motion.div>

        <Flex direction={{ base: 'column', xl: 'row' }} paddingInline={{ base: "2rem", xl: "15%" }} justifyContent={{ xl: "center" }} >
          {isMobile ? (
            <Fragment>
              {currentItems?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Box
                    borderColor={`rgba(134, 107, 171, 0.4)`}
                    borderStyle={"solid"}
                    cursor={"pointer"}
                    _hover={{
                      borderColor: "rgba(134, 107, 171, 1)",
                    }}
                    onClick={() => handleCredentialUrl(item.credential_url)}
                    borderWidth={"1px"}
                    m={2} p={8}
                  >
                    <Text opacity={0.7} mb={8}>
                      {item.description}
                    </Text>
                    <Flex>
                      <Box>
                        <Text>
                          {item.title}
                        </Text>
                        <Text>
                          {item.company_name}
                        </Text>
                        <Text opacity={0.5}>
                          {item.date}
                        </Text>
                      </Box>
                      <Spacer />
                      <Avatar name={item.title} src={item.logo_url} />
                    </Flex>
                  </Box>
                </motion.div>
              ))}
            </Fragment>
          ) : (
            <Grid templateColumns='repeat(2, 1fr)'>
              {currentItems?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Box
                    borderColor={`rgba(134, 107, 171, 0.4)`}
                    borderStyle={"solid"}
                    cursor={"pointer"}
                    _hover={{
                      borderColor: "rgba(134, 107, 171, 1)",
                    }}
                    onClick={() => handleCredentialUrl(item.credential_url)}
                    borderWidth={"1px"}
                    m={2} p={8}
                  >
                    <Text opacity={0.7} mb={8}>
                      {item.description}
                    </Text>
                    <Flex>
                      <Box>
                        <Text>
                          {item.title}
                        </Text>
                        <Text opacity={0.5}>
                          {item.company_name}
                        </Text>
                        <Text opacity={0.5}>
                          {item.date}
                        </Text>
                      </Box>
                      <Spacer />
                      <Avatar name={item.title} src={item.logo_url} />
                    </Flex>
                  </Box>
                </motion.div>
              ))}
            </Grid>
          )}
        </Flex>


        <Center marginTop={5}>
          {
            currentPage !== 1 && (
              <Button
                size={'md'}
                variant={'ghost'}
                colorScheme='purple'
                onClick={() => {
                  handlePaginate(currentPage - 1);
                }}
              >
                Previous
              </Button>
            )
          }

          {
            currentPage !== lastPage && (
              <Button
                size={'md'}
                variant={'ghost'}
                colorScheme='purple'
                onClick={() => {
                  handlePaginate(currentPage + 1);
                }}
              >
                Next
              </Button>
            )
          }
        </Center>

      </Box>



      {/* Footer transition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Footer />
      </motion.div>

    </Fragment>
  );
}

export default Badges;
