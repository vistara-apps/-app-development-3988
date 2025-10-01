import { useWalletClient } from "wagmi";
import { useCallback } from "react";
import axios from "axios";
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";

export function usePaymentContext() {
  const { data: walletClient, isError, isLoading } = useWalletClient();

  const createSession = useCallback(async (amount = "$0.001") => {
    if (!walletClient || !walletClient.account) throw new Error("please connect your wallet");
    if (isError) throw new Error("wallet not connected");
    if (isLoading) throw new Error("wallet is loading");
    
    const baseClient = axios.create({
      baseURL: "https://payments.vistara.dev",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const apiClient = withPaymentInterceptor(baseClient, walletClient);
    const response = await apiClient.post("/api/payment", { amount });
    const paymentResponse = response.config.headers["X-PAYMENT"];
    
    if (!paymentResponse) throw new Error("payment response is absent");
    
    const decoded = decodeXPaymentResponse(paymentResponse);
    console.log(`decoded payment response: ${JSON.stringify(decoded)}`);
    
    return decoded;
  }, [walletClient, isError, isLoading]);

  const processBookingPayment = useCallback(async (packagePrice, bookingFee = 3) => {
    const totalAmount = `$${(packagePrice + bookingFee).toFixed(2)}`;
    return await createSession(totalAmount);
  }, [createSession]);

  const unlockGem = useCallback(async (gemPrice) => {
    const amount = `$${gemPrice.toFixed(2)}`;
    return await createSession(amount);
  }, [createSession]);

  return { 
    createSession, 
    processBookingPayment, 
    unlockGem,
    isWalletConnected: !!walletClient?.account,
    isLoading 
  };
}