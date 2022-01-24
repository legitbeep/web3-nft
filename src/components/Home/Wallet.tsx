import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import {FaEthereum} from 'react-icons/fa';
import {IoReloadSharp} from 'react-icons/io5';
import { Button, Flex, Text } from "@chakra-ui/react";

declare let window: any;

const Wallet = () => {
    const [balance,setBalance] = useState("NA");

    const getBalance = async () => {
        if (typeof window !== undefined && window.ethereum){
            const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(account);
            setBalance(ethers.utils.formatEther(balance));
        }
    }

    useEffect(() => {
        getBalance();
    },[window])

    return (
        <Flex flexDirection="column" alignItems="center"> 
            <Text as="h2" fontSize="18px" fontWeight="bold" >Your Balance</Text>
            <Text as="h3" fontWeight="16px" ><FaEthereum /> : {balance}</Text>
            <Button onClick={getBalance} variant="primary" colorScheme="blue"><IoReloadSharp /> Reload</Button>
        </Flex>
    );
}

export default Wallet;