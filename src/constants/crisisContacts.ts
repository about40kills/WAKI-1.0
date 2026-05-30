/**
 * Ghana crisis and mental-health contacts (on-device only).
 * Numbers verified from official / government-backed sources as of 2026:
 * - Mental Health Authority: https://mha-ghana.com/contact/
 * - Accra Psychiatric Hospital: hospital site / Mental Health Authority listings (main line 0302 228688)
 * - Pantang Psychiatric Hospital: GHANEPS public organisation directory (0551585830)
 * - Emergency short codes: Ghana Police Service and National Communications Authority materials (191, 192, 193, 112)
 */
export const CRISIS_CONTACTS = [
  {
    name: "Mental Health Authority helpline",
    number: "0800678678",
    notes: "Toll-free psycho-social support & mental health (mha.gov.gh)",
  },
  {
    name: "Accra Psychiatric Hospital",
    number: "+233302228688",
    notes: "Main line; 24-hour national psychiatric referral hospital",
  },
  {
    name: "Pantang Psychiatric Hospital",
    number: "+233551585830",
    notes: "Greater Accra; psychiatric care & rehabilitation",
  },
  {
    name: "Ambulance (medical emergency)",
    number: "193",
    notes: "Ghana National Ambulance Service",
  },
  {
    name: "Police emergency",
    number: "191",
    notes: "Ghana Police Service",
  },
  {
    name: "National emergency line",
    number: "112",
    notes: "Toll-free; routes to police, fire, or ambulance (where available)",
  },
] as const;
