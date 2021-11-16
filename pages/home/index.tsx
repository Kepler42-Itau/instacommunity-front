import type { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import { Button, ButtonGroup, Heading, Center, Link } from "@chakra-ui/react";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router'


const Home: NextPage = () => {
	const userId = 1;
	const router = useRouter()
	return (
		<div>
		<Head>
			<title>Instacommunity</title>
		</Head>
		<Center>
			<Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline" onClick={() => router.push('/register')}>
				Register
			</Button>
		</Center>
		</div>
	);
};

export default Home;
