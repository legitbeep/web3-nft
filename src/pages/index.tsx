import { useEffect, useState } from 'react';
import { Box } from "@chakra-ui/react";

import TextSection from "components/TextSection";
import CTASection from "components/CTASection";
import ImageSection from "components/ImageSection";
import InstallModal from "components/InstallModal";

declare let window:any;

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined'){
      if (window.ethereum) {
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } 
  },[window])

  return (
    <>
      { showModal && <InstallModal /> }
      <Box mb={8} w="full">
        <TextSection />
        <ImageSection />
        <CTASection />
      </Box>
    </>
  );
};

export default Home;
