// Copyright 2019-2023 @polkadot/extension-polkagate authors & contributors
// SPDX-License-Identifier: Apache-2.0

import request from 'umi-request';

export default async function getPrices(chainNames, currency = 'usd') {

  const prices = await getReq(`https://api.coingecko.com/api/v3/simple/price?ids=${chainNames}&vs_currencies=${currency}`, {});

  return prices;
}

function getReq(api, data, option) {
  return request.get(api, {
    data,
    ...option
  });
}
