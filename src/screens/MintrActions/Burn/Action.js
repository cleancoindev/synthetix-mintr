import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { SlidePage } from '../../../components/ScreenSlider';
import { withTranslation } from 'react-i18next';

import { ButtonPrimary, ButtonTertiary, ButtonMax } from '../../../components/Button';
import { PLarge, H1, HyperlinkSmall } from '../../../components/Typography';
import TransactionPriceIndicator from '../../../components/TransactionPriceIndicator';
import Input from '../../../components/Input';
import ErrorMessage from '../../../components/ErrorMessage';

const Action = ({
	t,
	onDestroy,
	onBurn,
	maxBurnAmount,
	burnAmount,
	setBurnAmount,
	transferableAmount,
	setTransferableAmount,
	isFetchingGasLimit,
	gasEstimateError,
}) => {
	const [snxInputIsVisible, toggleSnxInput] = useState(false);
	return (
		<SlidePage>
			<Container>
				<Navigation>
					<ButtonTertiary onClick={onDestroy}>{t('button.navigation.cancel')}</ButtonTertiary>
				</Navigation>
				<Top>
					<Intro>
						<ActionImage src="/images/actions/burn.svg" big />
						<H1>{t('mintrActions.burn.action.title')}</H1>
						<PLarge>{t('mintrActions.burn.action.subtitle')}</PLarge>
					</Intro>
					<Form>
						<PLarge>{t('mintrActions.burn.action.instruction')}</PLarge>
						<Input
							singleSynth={'sUSD'}
							onChange={e => setBurnAmount(e.target.value)}
							value={burnAmount}
							placeholder="0.00"
							rightComponent={
								<ButtonMax
									onClick={() => {
										setBurnAmount(maxBurnAmount);
									}}
								/>
							}
						/>
						<ErrorMessage message={gasEstimateError} />
						{snxInputIsVisible ? (
							<Fragment>
								<PLarge>{t('mintrActions.burn.action.transferrable.title')}</PLarge>
								<Input
									singleSynth={'SNX'}
									onChange={e => setTransferableAmount(e.target.value)}
									value={transferableAmount}
									placeholder="0.00"
								/>
							</Fragment>
						) : (
							<ButtonToggleInput onClick={() => toggleSnxInput(true)}>
								<HyperlinkSmall>
									{t('mintrActions.burn.action.transferrable.button')}
								</HyperlinkSmall>
							</ButtonToggleInput>
						)}
					</Form>
				</Top>
				<Bottom>
					<TransactionPriceIndicator />
					<ButtonPrimary
						disabled={isFetchingGasLimit || gasEstimateError}
						onClick={onBurn}
						margin="auto"
					>
						{t('mintrActions.burn.action.buttons.burn')}
					</ButtonPrimary>
				</Bottom>
			</Container>
		</SlidePage>
	);
};

const Container = styled.div`
	width: 100%;
	height: 850px;
	max-width: 720px;
	margin: 0 auto;
	overflow: hidden;
	background-color: ${props => props.theme.colorStyles.panels};
	border: 1px solid ${props => props.theme.colorStyles.borders};
	border-radius: 5px;
	box-shadow: 0px 5px 10px 5px ${props => props.theme.colorStyles.shadow1};
	margin-bottom: 20px;
	padding: 0 64px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	justify-content: space-between;
`;

const Top = styled.div`
	height: auto;
`;

const Bottom = styled.div`
	height: auto;
	margin-bottom: 64px;
`;

const Navigation = styled.div`
	width: 100%;
	display: flex;
	text-align: left;
	padding: 20px 0;
`;

const Intro = styled.div`
	max-width: 380px;
	margin-bottom: 50px;
`;

const ActionImage = styled.img`
	height: ${props => (props.big ? '64px' : '48px')};
	width: ${props => (props.big ? '64px' : '48px')};
	margin-bottom: 8px;
`;

const Form = styled.div``;

const ButtonToggleInput = styled.button`
	border: none;
	margin: 30px 0;
	cursor: pointer;
	background-color: transparent;
`;

export default withTranslation()(Action);
