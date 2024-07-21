import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const App = () => {
  const router = useRouter();
  const handleNotificationClick = () => {
    router.push('/');
  };
  return handleNotificationClick();
};

export default App;
