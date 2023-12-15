import React, { Fragment, useEffect, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

import { useCryptocurrency } from "@/app/contexts/cryptocurrency.context";
import { getTokens } from "@/app/services/crypto-metrics/crypto-metrics.service";

import { DEFAULT_TOKEN, Token, TokenAutoCompleteItem } from "@/app/models/crypto-metrics";
import { Box } from "@mui/system";
import CandlestickChart from "@/app/pages/chart-wrapper/crypto-metrics/candlestick-chart";
import HistoryChart from "@/app/pages/chart-wrapper/crypto-metrics/history-chart";

const CryptoMetrics = () => {
  const { currentToken, setCurrentToken } = useCryptocurrency();

  const [tokensList, setTokensList] = useState<TokenAutoCompleteItem[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const { data }: { data: Token[] } = await getTokens();

      if (!data) {
        return;
      }

      // Had to create both label and name. API returns repeated names and AutoComplete needs label for correct filtering.
      const autoCompleteItems: TokenAutoCompleteItem[] = data.map((token) => {
        return { label: token.id, id: token.id, symbol: token.symbol, name: token.name };
      });
      setTokensList(autoCompleteItems);
    };

    fetchTokens();
  }, []);

  return (
    <div className="w-full">
      {!!tokensList && (
        <div className="flex flex-col my-4">
          <div className="flex flex-col gap-y-2">
            <Autocomplete
              disablePortal
              options={tokensList}
              sx={{ width: 400 }}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderInput={(params) => <TextField {...params} label="Search your cryptocurrency" />}
              onChange={(event, newValue) => {
                setCurrentToken(newValue?.id || DEFAULT_TOKEN);
              }}
              renderOption={(props, option) => (
                <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props} key={props.id}>
                  {option.name} ({option.symbol})
                </Box>
              )}
            />
            <p className="italic text-xs font-medium text-slate-600">By removing a selected token, BTC will be selected as default</p>
          </div>

          <div className="flex flex-col gap-y-16">
            {currentToken && (
              <Fragment>
                <HistoryChart currentToken={currentToken}></HistoryChart>
                <CandlestickChart currentToken={currentToken} />
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoMetrics;
