import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const ErrorBoundary = () => {
  const router = useRouter();
  return router.push('/');
};
export default ErrorBoundary;
