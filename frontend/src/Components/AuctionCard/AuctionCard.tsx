import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useBid } from "../../Contexts/BidContext";
import { Auction } from "../../Interfaces/Interfaces";
import { handleCount } from './auctionUtils'
import {
  StyledCard,
  StyledImg,
  StyledTitle,
  StyledDesc,
  StyledAvatar,
  StyledButton,
  StyledCardContent,
  StyledSpan,
} from "./StyledAuctionCard";

interface Props {
  auction: Auction;
  fetchAuctions: () => Promise<void>;
}

const AuctionCard = ({ auction, fetchAuctions }: Props) => {
  const ONE_DAY_IN_MILLIS = 86400000;

  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [differenceInMillis, setDifferenceInMillis] = useState(0);
  const [counter, setCounter] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState("Dagar kvar:");
  const [bid, setBid] = useState<undefined | number>();
  const [quickBid, setQuickBid] = useState<number>();
  
  const { whoAmI } = useAuth();
  const { createBid } = useBid();
  
  useEffect(() => {
    if (!!auction?.bids?.length) {
      setBid(auction.bids.pop()?.price);
    } else {
      setBid(auction?.startPrice)
    }
  }, [auction.bids]);

  useEffect(() => {
    handleQuickBid()
  }, [!!bid, bid])

  useEffect(() => {
    handleTime();
  }, [daysLeft]);

  const handleTime = async () => {
    const endDateInMillis = new Date(auction.endDate + "").getTime();
    const todayInMillis = new Date().getTime();
    setDifferenceInMillis(endDateInMillis - todayInMillis);
    differenceInMillis <= 0 && fetchAuctions();
    differenceInMillis <= ONE_DAY_IN_MILLIS && setCounter(differenceInMillis);
    setDaysLeft(Math.round(differenceInMillis / (60 * 60 * 24 * 1000)));
  };

  useEffect(() => {
    handleCounter();
  }, [counter]);

  const handleCounter = () => {
    if (counter !== null) {
      handleCount(
        counter,
        differenceInMillis,
        setDaysLeft,
        setRemainingTime,
        setCounter,
        handleTime
      );
    }
  };

  const handleQuickBid = () => {
    if (!!bid) {
      if (bid <= 10) {
        setQuickBid(bid  + 1);
      }
      if (bid  <= 100 && bid  > 10) {
        setQuickBid(bid + 10);
      }
      if (bid >= 1000 && bid > 100) {
        setQuickBid(bid + 100);
      }
    }
  };

  const handleBid = async () => {
    if (whoAmI == null || whoAmI == auction.host?.id) return;
    
    const newBid = {
      userId: whoAmI.id,
      auctionId: auction.id,
      price: quickBid,
      createdDate: Date.now()
    }
    
    await createBid(newBid);
  };

  return (
    <StyledCard>
      <StyledImg src="https://i.pinimg.com/564x/9e/8b/dc/9e8bdc74df3cb2f87fae194a18ba569a.jpg" />
      <StyledCardContent>
        <div>
          <StyledAvatar>{auction.title.charAt(0)}</StyledAvatar>
          <StyledTitle>{auction.title}</StyledTitle>
        </div>
        <div>
          <StyledDesc>
            <StyledSpan>Pris:</StyledSpan> {auction.startPrice} SEK
          </StyledDesc>
          <StyledDesc>
            <StyledSpan>Högsta bud:</StyledSpan> {bid} SEK
          </StyledDesc>
          <StyledDesc>
            <StyledSpan>{remainingTime}</StyledSpan> {daysLeft}
          </StyledDesc>
        </div>
        <StyledButton onClick={() => handleBid()}>
          Snabb bud {quickBid} SEK
        </StyledButton>
      </StyledCardContent>
    </StyledCard>
  );
};

export default AuctionCard;