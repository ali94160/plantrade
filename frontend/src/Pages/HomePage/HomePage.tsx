import { useEffect } from "react";
import { useSearch } from "../../Contexts/SearchContext";
import { useAuth } from "../../Contexts/AuthContext";
import SearchForm from "../../Components/Search/SearchForm/SearchForm"
import { imageIcons } from "./ImageIcons"
import Carousel from 'react-elastic-carousel';
import ImageListItem from '@mui/material/ImageListItem';
import {
  StyledWrapper,
  StyledSearchWrapper,
  StyledImg,
  StyledSearchFieldWrapper,
  StyledIconImg,
  StyledTest,
  StyledText,
  StyledTitle,
  StyledCarouselWrapper,
  StyledPageWrapper,
  StyledAvatar,
  StyledUsername,
  StyledImageListItem,
  StyledImageListItemBar,
  StyledNewsImg,
  StyledNewsWrapper,
  StyledAuctionImg,
  StyledSoonEndingWrapper
 } from "./StyledHomePage";
import { useAuction } from "../../Contexts/AuctionContext";

interface IconImage{
  imgFile: string;
  text: string;
}


const HomePage = () => {

  const { searchText } = useSearch();
  const { whoAmI } = useAuth();
  const { auctions } = useAuction();

  const renderCategories = () => (
    <StyledCarouselWrapper>
      <Carousel isRTL={true} itemsToShow={3} outerSpacing={0} pagination={false} initialFirstItem={3}>
        {imageIcons.map((icon: IconImage) => {
          return <StyledTest key={icon.text} ><StyledIconImg src={icon.imgFile} />
            <StyledText>{icon.text}</StyledText>
          </StyledTest>
        })}
      </Carousel>
    </StyledCarouselWrapper>
  );

  const renderNews = () => (
    <StyledNewsWrapper>
      <StyledImageListItem>
        <StyledNewsImg
          src="https://i2.wp.com/www.livingloving.net/wp-content/uploads/2017/01/living-loving-indoor-plants-3.jpg?resize=1769%2C1000&ssl=1"
          alt="News picture"
          loading="lazy" />
        <StyledImageListItemBar
          title="För Hemmet"
          subtitle="Flera typer av växter"
        />
      </StyledImageListItem>
          
    </StyledNewsWrapper>
  );

    const renderSoonEndingAuction = () => (
    <StyledSoonEndingWrapper>
      <StyledImageListItem>
          <StyledAuctionImg
          src="https://i2.wp.com/www.livingloving.net/wp-content/uploads/2017/01/living-loving-indoor-plants-3.jpg?resize=1769%2C1000&ssl=1"
          alt="News picture"
          loading="lazy" />
          <StyledImageListItemBar
          width="40%"
          subtitle="Name"
        />
      </StyledImageListItem>
          
    </StyledSoonEndingWrapper>
  );



  return (
    <StyledWrapper>
      <StyledSearchWrapper>
        <StyledImg src="https://i.pinimg.com/564x/63/5e/b1/635eb177eef29242e96352f1206298da.jpg" alt="" />
        {whoAmI && <StyledUsername>Hej {whoAmI.username}</StyledUsername>}
        {whoAmI && <StyledAvatar>{whoAmI.username.charAt(0)}</StyledAvatar>}
        <StyledSearchFieldWrapper>
          <SearchForm searchWord={searchText}/>
        </StyledSearchFieldWrapper>
        </StyledSearchWrapper>

      <StyledPageWrapper>
        <StyledTitle>Kategorier</StyledTitle>
        {renderCategories()}

        <StyledTitle>Nyheter</StyledTitle>
        {renderNews()}

        <StyledTitle>Snart avslutade auctioner</StyledTitle>
        {renderSoonEndingAuction()}
    {console.log(auctions , 'auc?')}
      </StyledPageWrapper>
    </StyledWrapper>
  );
}

export default HomePage;