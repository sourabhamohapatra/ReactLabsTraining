import React, { Fragment, useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { ChatBotProvider } from "./store/ChatBotContext";
import ChatBot from "./Components/ChatBot/ChatBot";
import ChatBotButton from "./Components/ChatBot/ChatBotButton";

function App() {
  const [cartIsshown, setCartIsShown] = useState(false);
  const [chatBotIsShown, setChatBotIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showChatBotHandler = () => {
    setChatBotIsShown(true);
  };

  const hideChatBotHandler = () => {
    setChatBotIsShown(false);
  };

  return (
    <CartProvider>
      <ChatBotProvider>
        {cartIsshown && <Cart onClose={hideCartHandler} />}
        {chatBotIsShown && <ChatBot onClose={hideChatBotHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
        <ChatBotButton onClick={showChatBotHandler} />
      </ChatBotProvider>
    </CartProvider>
  );
}

export default App;
