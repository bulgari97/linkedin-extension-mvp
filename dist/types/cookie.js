"use strict";
const OUR_COOKIE_NAMES = ["access_token", "refresh_token"];
const LINKEDIN_COOKIE_NAMES = ["JSESSIONID", "li_at"];
/*
  Make in future more strong types. Example:

  const tokens = ['ACCESS_TOKEN', 'REFRESH_TOKEN', ...] as const;

  type TokenTuple = readonly [typeof tokens[0], typeof tokens[1], typeof tokens[2]];


  So this need be this:

  const cookies: { name: TokenTuple[number]; value: string }[] = [
    { name: 'ACCESS_TOKEN', value: 'abc123' },
    { name: 'REFRESH_TOKEN', value: 'def456' },
    { name: 'API_KEY', value: 'ghi789' },
  ];
*/ 
//# sourceMappingURL=cookie.js.map