import axios, { type AxiosError } from "axios";
import type {
	InstitutionProps,
	LinkAddressRequest,
	LinkAddressResponse,
	LinkedAddressTransactionList,
	PaymentOrderParams,
	PaymentOrderResponse,
	RatePayload,
	RateResponse,
	VerifyAccountPayload,
} from "./types";

const AGGREGATOR_URL = process.env.NEXT_PUBLIC_AGGREGATOR_URL;
const NGN_PROVIDER_ID = process.env.NEXT_PUBLIC_NGN_PROVIDER_ID;
const KES_PROVIDER_ID = process.env.NEXT_PUBLIC_KES_PROVIDER_ID;

export const fetchSupportedInstitutions = async (
	currency: string,
): Promise<InstitutionProps[]> => {
	try {
		const response = await axios.get(
			`${AGGREGATOR_URL}/institutions/${currency}`,
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching supported institutions: ", error);
		throw error;
	}
};

export const fetchAccountName = async (
	payload: VerifyAccountPayload,
): Promise<string> => {
	try {
		const response = await axios.post(
			`${AGGREGATOR_URL}/verify-account`,
			payload,
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching account name: ", error);
		throw error;
	}
};

export const fetchRate = async ({
	token,
	amount,
	currency,
}: RatePayload): Promise<RateResponse> => {
	try {
		const providerId = currency === "KES" ? KES_PROVIDER_ID : NGN_PROVIDER_ID;
		const response = await axios.get(
			`${AGGREGATOR_URL}/rates/${token}/${amount}/${currency}?provider_id=${providerId}`,
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching rate:", error);
		throw error;
	}
};

export const linkNewAddress = async ({
	privyId,
	payload,
}: {
	privyId: string;
	payload: LinkAddressRequest;
}): Promise<LinkAddressResponse> => {
	try {
		const response = await axios.post(
			`${AGGREGATOR_URL}/linked-addresses`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${privyId}`,
				},
			},
		);
		return response.data.data;
	} catch (error) {
		console.error("Error linking address:", error);
		throw error;
	}
};

export const fetchLinkedAddress = async ({
	address,
}: { address: string }): Promise<string> => {
	try {
		const response = await axios.get(
			`${AGGREGATOR_URL}/linked-addresses/?owner_address=${address}`,
		);
		return response.data.data.linkedAddress;
	} catch (error) {
		if ((error as AxiosError).response?.status === 404) {
			return "No linked address";
		}
		console.error("Error fetching address status:", error);
		throw error;
	}
};

export const fetchTransactionHistory = async ({
	address,
	privyId,
	params,
}: {
	address: string;
	privyId: string;
	params?: PaymentOrderParams;
}): Promise<LinkedAddressTransactionList> => {
	try {
		const response = await axios.get(
			`${AGGREGATOR_URL}/linked-addresses/${address}/transactions`,
			{
				headers: {
					Authorization: `Bearer ${privyId}`,
				},
				params,
			},
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching transaction history:", error);
		throw error;
	}
};
