import React, { createContext, FC, useContext, useState } from 'react'
import { useAuction } from "./AuctionContext"
import { Bid } from "../Interfaces/Interfaces"
import { useSnackBar } from './SnackBarContext';


type Props = {
  children?: JSX.Element;
};

const BidContext = createContext<any>(null);

export const useBid = () => useContext(BidContext);

const BidContextProvider: FC<Props> = ({ children }: Props) => {
  const [highestBid, setHighestBid] = useState();

  const { addSnackbar } = useSnackBar();

  const createBid = async (newBid: Bid) => {
    let res: Response = await fetch("/api/bid", {
      method: "POST",
      body: JSON.stringify(newBid),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      let bid = await res.json();
      addSnackbar("Giltigt bud!");
      return bid;
    } else {
      addSnackbar({ message:"Ogiltigt bud", status: "error" })
      return null;
    }
  };

  const getHighestBid = async (id: Number) => {
    let res: Response = await fetch(`/api/${id}/highest-bid`);

    if (res.status == 200) {
      let data = await res.json();
      setHighestBid(data.price);
    } else {
      console.log("opsi, something went wrong");
      // add toaster saying something went wrong
    }
  };

  const value = {
    createBid,
    getHighestBid,
    highestBid,
  };

  return <BidContext.Provider value={value}>{children}</BidContext.Provider>;
};

export default BidContextProvider;
