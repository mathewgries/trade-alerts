import ls from "local-storage";
import { getTokenExpiration } from "../helpers";

const authUrl = "https://auth.tdameritrade.com/auth";
const url = "https://api.tdameritrade.com";
const token_url = "/v1/oauth2/token";
const multi_quote_url = "/v1/marketdata/quotes";

// https://localhost/?code=7WRAgbs3s7VmoaxuwpzKGx0dAjkCIwFlhPqBljZ1DeCKnkwmFGiCDnumS6ePJ74F4yK%2FfNPHNbJXxP9qhvAVMyWZB4AeHuIAaN7SXqgDB%2BnzcfJY6VMh%2FO1klIKrrXOUPOkz0uyoMiAv61ShSIrLtm9xEdugGthTVs5lW6KvJ3qOqEoldix84a0fV7nCxh%2BWTa3xl6GdrvaM5mE2m3W4%2FDsUA2SWzEzrCE2zKhH66ZA851R55E8XMY5TED%2Fxsu3YKEGGEGFePKpyt4e7rxAev%2B%2FsPSFCsVpH%2FEqSEsARoYO%2FGfyvg6ZBfEQu9e679y%2B9BzCHxcNe9lqxkFYWsCb%2BBDjN4qWynH1UdhIlWrX2FBFQJ5bdCmcmE62RsibOO0zipSiCGIoUKO09lmzAU6sofI1sfG%2F1DolCIHjkJGMyIy5hK7FbxA3xf7twZlS100MQuG4LYrgoVi%2FJHHvlaQE4cxI5xURLe1vR5sHKfr3yKuBLmxYHvc%2FV56jf8IgdOW%2BhiSk7LgY5m%2BGoQAI8nKBRyycBVgliMw0g4sUFOfR6%2Bz3AY6pp5o1CQ5FL3F211SEh%2BoCwufbxQUpXRk18WyVcPqrKde1fOrb8GkgRlj9uiAlH85%2F6XlEDiwRtwzMNTizGDHMIPwJdwgVyxbiLtGbj4rrKvY%2BHY4x862e08UQJMWd%2BUzrKCqn19kxiudTBssK7zJ1BBq0wDsk0srVCI8SiWwWclIPGUpVWTlxGVh1XpFllcIjjm5VlmWALGNtt8qqVa6EZjfeZ0UOWVdvbY9egHhxSjasPCA4u7JtIgywKebfrjRIBnxXax0%2Bvv%2FFG2x5TtlIocRZeLUV8XlgceVJPnz6NXXC%2BRS0HwAhCLlKBfdI%2FmYDoxET4zySmJ0yWYlgLaBrYnKCgrlI%3D212FD3x19z9sWBHDJACbC00B75E

export async function authenticateSite() {
  const { client_id, redirect_uri } = await ls.get("site-credentials");
  const url = `${authUrl}?response_type=code&redirect_uri=${redirect_uri}&client_id=${client_id}@AMER.OAUTHAP`;
  console.log(url)
	window.open(url, '_blank')
}

async function validateTokenExpiration() {
  try {
    const tokenExp = await ls.get("auth-token").expirationDate;
    const expDate = new Date(tokenExp);
    const currentDate = new Date();
    if (expDate.getTime() > currentDate.getTime()) {
      const data = await refreshAuthToken();
      await ls.set("auth-token", data);
    }
  } catch (e) {
    console.error(e.message);
  }
}

export async function refreshAuthToken() {
  const client_id = await ls.get("site-credentials").client_id;
  const refresh_token = await ls.get("refresh-token");

  const params = {
    grant_type: "refresh_token",
    refresh_token: refresh_token,
    client_id: `${client_id}@AMER.OUATHAP`,
  };

  console.log(params);

  const results = await fetch(`${url}${token_url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err.message));

  return { ...results, expirationDate: getTokenExpiration() };
}

export async function getPriceQuotes(tickers) {
  await validateTokenExpiration();
  const access_token = await ls.get("auth-token").access_token;

  const results = await fetch(`${url}${multi_quote_url}?symbol=${tickers.map((x) => x.ticker)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((e) => console.error(e));

  return results;
}
