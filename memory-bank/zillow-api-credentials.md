# Zillow API Credentials Guide

## Purpose

This document outlines the steps required to obtain and configure Zillow API credentials for use in the Apartment Cost Analyzer project.

## Important Update: Zillow API Access (2025)

As of April 2025, the Zillow Zestimates API (including rent estimates) is **not publicly available** for general developer use. Access to the Zestimates API is restricted and typically requires a business relationship or partnership with Zillow. There is no self-serve API key registration for rent estimates or property data.

### What This Means

- You cannot obtain a Zillow API key for rent estimates via the public developer portal.
- The official developer documentation does not provide a public endpoint for rent estimates or a way to generate an API key for this purpose.
- Most third-party guides reference the API but do not provide a working signup process.

### Recommended Alternatives

Consider using one of the following APIs for rent estimate data:

1. **RentCast API**

   - https://www.rentcast.io/api
   - Provides rental data, comps, and market trends.

2. **ATTOM Rental AVM API**

   - https://developer.attomdata.com/
   - Offers rental property data and analytics.

3. **Rentometer API**

   - https://www.rentometer.com/developers
   - Delivers rent comparison and market data.

4. **Zillow Research Data**
   - https://www.zillow.com/research/data/
   - Downloadable datasets for research (not real-time API).

### Next Steps

- Select an alternative API provider that fits your requirements.
- Register for an account and obtain an API key from the chosen provider.
- Update your environment variables and integration code accordingly.
- Document the new provider and integration steps in the memory bank.

## Status

- [ ] Alternative API selected
- [ ] API credentials obtained
- [ ] Environment variables configured in Vercel
- [ ] Local development environment updated

_Last updated: 2025-04-11 16:15 EDT_
