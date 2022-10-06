import React from 'react';
import QualifiedTestResult from 'components/adoption/QualifiedTestResult';
import DisqualifiedTestResult from 'components/adoption/DisqualifiedTestResult';
import { useSelector } from 'react-redux';

function AdoptionResult() {
  const score = useSelector((state) => state.score.value);

  if (score >= 80) {
    return <QualifiedTestResult />;
  }
  return <DisqualifiedTestResult />;
}

export default AdoptionResult;
