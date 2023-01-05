// Copyright 2019-2023 @polkadot/extension-polkagate authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description
 * get all information regarding a pool
 *
 * rewardPool.balance: The pool balance at the time of the last payout
 * rewardPool.totalEarnings: The total earnings ever at the time of the last payout
 */
import { BN_ZERO, bnMax } from '@polkadot/util';

import getApi from '../apis/getApi';
import getPoolAccounts from '../apis/getPoolAccounts';

async function getPool(endpoint, id = undefined) {
  console.log(`getPool is called for id:${id}`);
  const api = await getApi(endpoint);
  const token = api.registry.chainTokens[0];
  const decimal = api.registry.chainDecimals[0];

  if (!id) {
    console.log(`can not find member for id is :${id}`);

    return null; // user does not joined a pool yet. or pool id does not exist
  }

  const poolId = id;
  const accounts = getPoolAccounts(api, poolId);

  if (!accounts) {
    console.log(`can not find a pool with id:${poolId}`);

    return null;
  }

  const [metadata, bondedPools, rewardPools, rewardIdBalance, stashIdAccount] = await Promise.all([
    api.query.nominationPools.metadata(poolId),
    api.query.nominationPools.bondedPools(poolId),
    api.query.nominationPools.rewardPools(poolId),
    api.query.system.account(accounts.rewardId),
    api.derive.staking.account(accounts.stashId)
  ]);

  const unwrappedRewardPools = rewardPools.isSome ? rewardPools.unwrap() : null;
  const unwrappedBondedPool = bondedPools.isSome ? bondedPools.unwrap() : null;
  const poolRewardClaimable = bnMax(BN_ZERO, rewardIdBalance.data.free.sub(api.consts.balances.existentialDeposit));
  const rewardPool = {};

  if (unwrappedRewardPools) {
    rewardPool.balance = unwrappedRewardPools?.balance ? String(unwrappedRewardPools.balance) : undefined;
    rewardPool.points = unwrappedRewardPools?.points ? String(unwrappedRewardPools.points) : undefined;
    rewardPool.totalEarnings = unwrappedRewardPools?.totalEarnings ? String(unwrappedRewardPools.totalEarnings) : undefined;
  }

  const poolInfo = {
    accounts,
    bondedPool: unwrappedBondedPool,
    decimal,
    metadata: metadata.length
      ? metadata.isUtf8
        ? metadata.toUtf8()
        : metadata.toString()
      : null,
    poolId,
    rewardClaimable: Number(poolRewardClaimable),
    rewardIdBalance: rewardIdBalance.data,
    rewardPool: unwrappedRewardPools,
    stashIdAccount,
    token
  };

  return JSON.stringify(poolInfo);
}

onmessage = (e) => {
  const { endpoint, id } = e.data;

  // eslint-disable-next-line no-void
  void getPool(endpoint, id).then((poolInfo) => {
    postMessage(poolInfo);
  });
};