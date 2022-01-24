import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Link as ChakraLink
  } from '@chakra-ui/react'

  function InstallModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Install Metamask</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              It seems you don't have metamast installed. Please install metamask in order to proceed further!
            </ModalBody>
  
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <ChakraLink href='https://metamask.io/download/' isExternal={true} target="_blank" >
                    <Button colorScheme='blue' >Install</Button>
              </ChakraLink>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default InstallModal;