const OUR_COOKIE_NAMES = ["access_token", "refresh_token"] as const;
 
const LINKEDIN_COOKIE_NAMES = ["JSESSIONID", "li_at"] as const;

/*
  this need for cookie + COOKIE_NAMES
*/
type OurCookieName = (typeof OUR_COOKIE_NAMES)[number];

type LinkedInCookieName = (typeof LINKEDIN_COOKIE_NAMES)[number];

/*
  set new cookies here /store/api-config
*/
type OurCookie = {
  name: OurCookieName;
  value: string;
};

type LinkedInCookie = {
  name: LinkedInCookieName;
  value: string;
  domain: string;
};


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