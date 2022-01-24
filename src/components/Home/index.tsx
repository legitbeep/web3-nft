import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Box, Button, Text } from '@chakra-ui/react';
import Image from 'next/image'

import DumbGuys from 'artifacts/contracts/nft.sol/DumbGuys.json';
import Wallet from './Wallet';

import nft from 'utils/nft'

declare let window:any;
const NFT: {[key: number]: string} = nft;
const contractAddress = '';
const provider = new ethers.providers.Web3Provider(window?.ethereum);

// get user
const signer = provider.getSigner();
// get smart contract
const contract = new ethers.Contract(contractAddress, DumbGuys.abi, signer);

const Home = () => {
    const [totalMinted, setTotalMinted] = useState(0);

    const getCount = async() => {
        const count = await contract.count();
        setTotalMinted(parseInt(count));
    }

    useEffect(() => {
        getCount();
    },[window])

    return (
        <Box w="full" justifyContent="center">
            <Wallet />
            {
                Array(totalMinted+1)
                    .fill(0)
                    .map((_,i) => (
                        <Box>
                            <NFTImage tokenId={i} />
                        </Box>
                    ))
            }
        </Box>
    );
}

type NFTProps = {
    tokenId : number,
    getCount ?: () => void;
}

function NFTImage ({tokenId, getCount}: NFTProps) {
    const contentId = process.env.PINATA_ID; // from pinata
    const metadataURI = `${contentId}/${NFT[tokenId]}.json`;
    //const imgUri = `https://gateway.pinata.cloud/ipfs/${contentId}/${NFT[tokenId]}.png`; // mostly broken fix it
    const imgUri = `img/${NFT[tokenId]}.png` // maybe get it locally

    const [isMinted, setIsMinted] = useState(false);

    const getMintedStatus = async () => {
        const isOwned = await contract.isContentOwned(metadataURI);
        setIsMinted(isOwned);
    }

    useEffect(() => {
        getMintedStatus();
    },[isMinted])

    const mintToken = async() => {
        // connect to smart contract 
        const connection = contract.connect(signer);
        // buyer wallet addr
        const addr = connection.address;
        const res = await contract.payToMint(addr, metadataURI, {
            value: ethers.utils.parseEther('0.05')
        });
        await res.wait();
        getMintedStatus();
    }

    async function getUri () {
        const uri = await contract.tokenURI(tokenId);
        alert(uri);
    }

    return (
        <Box>
            <Image src={isMinted ? imgUri : 'img/placeholder.png'} alt="NFT" />
            <Box>
                <Text as="h4" fontSize="16px" >ID: #{tokenId}</Text>
                {
                    !isMinted ?
                    <Button onClick={mintToken} colorScheme="blue" >Mint</Button>
                    :
                    <Button onClick={getUri}>Taken! Show URI</Button>
                }
            </Box>
        </Box>
    )
}

export default Home;