import { Fragment } from 'react';
import {
	Center,
	Box,
	useRadio,
	useRadioGroup,
	VStack,
	Image,
	Text,
	HStack,
} from '@chakra-ui/react';
import { LineChart, Line } from 'recharts';

const data = [
	{
		pv: 2400,
	},
	{
		pv: 1398,
	},
	{
		pv: 9800,
	},
	{
		pv: 3908,
	},
	{
		pv: 4800,
	},
	{
		pv: 3800,
	},
	{
		pv: 4300,
	},
];

function RadioCard(props: any) {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				maxW='sm'
				minW='329px'
				minH='71px'
				color='black'
				borderWidth='2px'
				borderRadius='8px'
				backgroundColor='#FCFCFC'
				boxShadow='md'
				_checked={{
					borderColor: 'black',
				}}
				px={2}
				py={3}
			>
				<HStack spacing={4}>
					<Image
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/255px-Tesla_T_symbol.svg.png?20170327222004'
						alt='Tesla'
						w='39px'
						h='39px'
					/>
					<Box>
						<VStack display='block' float='left'>
							<Text fontSize='12px'>Tesla</Text>
							<Text fontSize='12px' color='#6D6D6D'>
								Tesla, inc.
							</Text>
						</VStack>
					</Box>
					<Box>
						<LineChart width={99} height={50} data={data}>
							<Line type='monotone' dataKey='pv' stroke='#6CB8D6' dot={false} />
						</LineChart>
					</Box>
					<Box>
						<VStack lineHeight='1' display='block' float='right'>
							<Text fontSize='16px' color='#139602'>
								+0.5%
							</Text>
							<Text fontSize='16px' fontWeight='bold'>
								$1,000.00
							</Text>
							<Text fontSize='12px' color='#6D6D6D'>
								Auction price
							</Text>
						</VStack>
					</Box>
				</HStack>
			</Box>
		</Box>
	);
}

export const Transactions = () => {
	const options = ['TSLA', 'AAPL', 'GOOGL'];

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'stocks',
		defaultValue: 'TSLA',
		onChange: console.log,
	});

	const group = getRootProps();

	return (
		<Fragment>
			<Center mt='50px'>
				<VStack {...group}>
					{options.map((value) => {
						const radio = getRadioProps({ value });
						return <RadioCard key={value} {...radio}></RadioCard>;
					})}
				</VStack>
			</Center>
		</Fragment>
	);
};
