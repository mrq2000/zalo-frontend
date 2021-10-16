import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InputPhoneNumberStep from '../components/signin/InputPhoneNumberStep';
import Intro from '../components/signin/Intro';

const SignIn = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Intro nextStep={nextStep} />;
      case 2:
        return <InputPhoneNumberStep previousStep={previousStep} />;
      default:
        return <Intro />;
    }
  };

  return <View style={{ height: '100%' }}>{renderStep()}</View>;
};

const styles = StyleSheet.create({});

export default SignIn;
