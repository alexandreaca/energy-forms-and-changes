/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAABcCAYAAACSu3yDAAAACXBIWXMAABcSAAAXEgFnn9JSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACTxJREFUeNrsnc9PW9kdxe97tsEGDLbBQKyJQpRO00nVFLVdtFLV5g/oopquZlepm3Yz66qLpHTdbWfbVduoq0jddBmpvzKbigkhySSUMgECBmOMbWyM7eee8+JHjTEMPwwYOEe6vF/wbN/7eef7vfeZd61arWYk6bRkCTBJgEkCTJIEmCTAJAEmSQJMEmCSAJMkASYJMEmASZIAkwSYJAkwSYBJAkySBJgkwCQBJkkCTOo8+ScmJu69/9XbnyQS762oOqR2aS2Viiwuzv/Jj/V72PgAgH2gapHaBlg6ZXL53IzNjWx2o6oqkdqp9FrKqZTLeRewSqXiy2TWVStSW7S1tWVKpZLLlu3tfPF8Wtm+1BZNTU063voOYOXydu3Zs6eqHelEmp2dMcVCwdoDmA0hbtbevl1QLUnH0tvFBbMw/6ZmQXsAo/x+vzXz+lXt1ecvVFvSkfTmzZyZmXm1Cy6XqcYNHgsGg1Yyuezk8zn77je/RehUe9K+QgfRTCO12tjIOIyC3Nc4eG83/wEh6+npsdELMP/6599qqdSqalFqKY48fPrkH042u0EjspvMa6+DNUFmHMexnk9P1fr6wtadr3+D7qZaldxhiJcvpjl+WvP5fDaj3H63HA+Mf11dXSYej1vFYpGkmqH4sLl1632BdoXBmv3Pa7O6umIAFvmwmkPikQDz3CwcDpu+vj6Ty+Vc0OLDwyaReM9EIlHV+hUBa+b152ZtLeXm5KFQyHhgfdmXJQ6dwfPEQ0NDZnBw0OTzeTP1dLIGJ6tdv37DprOpM3D5tLy8ZBbmv3AKhYKbYzFtouEcBqwjA+YpEAi4oKFYm5ubFrqnDrqn2I67oGGplrngifviwoJJp1MOYUIYtBm9DutYJwbME2NwNBpljmazq7q6ukobdV6+eG4NIW8jaILtYogjBcnkssmspx0CBBMhVO6ogwfVcb832Ja41t3dbW7cuIEOwC2bHYKVlRXzxdxsZfrZUz9gq0YGor6BSAR5XFit2SE5FaFaQ0FPsNGpbBrHSaFqO2CNop0ODAzQ4fzlchmWm/Elk0kzNzfrII47sdigP9TTiw6CgDsr5fM5N28mUBsbmSpkESimO7FYrC1OdWaANYq9DQJHd+N4CT6knUql3HD69LP/1qj+/gHCZhM6AqchkJO709ZWETnUmhvykCd7UcZmpMHF7+PwUyNQp/m1+TPt+tG12Au9c+cOgbNQGdb6+rpZWlqCZa84CKkctHMAXbUvHA6EQj0ucARPvdTWCTmBKgAirAOmPAfHbdSZQ4ciVP39/aY57J3l/2Gca6t54fTmzZvcdG9b5XI5e21tjcWwZNbXSgix3XXwyqGeUHd3V7cJoBC+YDB0aV2PnSeGN3eZy5lisWAKxUK5WCj4EOYIUBlhLkBn6uvrtWOxqKmPqtvnBVRHAdZKHNRlGRsb2+lDeOChdBO67e3tHfjS6XQAuZ6NcFxBKRtjhZBXmEq1iivXb7wu9jsHjXaM8/w/P8qbCnLVWs1BfrRhqk61uF0qBfAZ3bbp7e0tsQ6w5FeqzGAsFgiMjLjDRQAn0AxSp/2X2IWJOx54iURiVwfWG5/JZrN+AOjnOkMuxRv2y0uLBld7EZvWZ5P/3mV10Wh0693f8xRO1bLtkGUsn+uM9dHqdwNAOz9272rYqFTKLiw4VbXmOHw9H++D8CDeW7Dps7ivi95bkIOX9S8hmKGhQa6HGNL4HurAdHc6RJcCsMMASLdi5Y+OjjY3SKhVIyH/CxLCxkFEFo5cMzn2GvIwy/7+sBkejnPdx+jfeD6mAU2vHWz1fi4qRFcCsON2Og7T0O0oV1W2+mKSAJMEmCQJMEmASQJMkgSYJMAkASZJAkwSYJIAkyQBJgkwSRJgkgCTBJgkCTBJgEkCTJIEmCTApCsIWEbVIJ2SlgnYI5SK6kJqs8jUQ/vBgwdzWFnSzLdSu1RnaRNsTXo52MeO48jFpHYBxvlHf7WT5IM0hslP+ZggSTqJYFRcvARTnzT3In+Eg/N8NJIkHRcuuBefJvP9xl6kqbsYe5N3q9XqPJ+aJ0lHEbghYHSn79ZZMs0O5kIGAu8iVM7n8/mKEn/pUN1FpFaMfli9zcS+8diegVYPMvzBn9PpdJWPJZek/VyrVCoBFecxo199RGKXrINcamJi4p5t24/8fn9vLBbz86l7fAYon8Dnlcbtg44dtN1qGrijdouvWjnPz81ciw/uw7KEtvvZ/fv3/7Bf2xx4qwhEPsZJxkDq75LJ5DYfQc5n30tXN4knWIxqAO332DV6EFxf6mBNbjYGN/stXuQnfFQlH0fOR2TLwS6/g9FUvIK2+gv2fdwqHJ4IsAbQIgDj13C1n2MZGB4etlHcuSUF2OUBjG7FISs4FmcGqaCN/oj9vzksWMcGrAm2nwYCgV+C7NucGIuzsF27dk2AXWDAGALrYLFd5rHvPl7qUePQw5kB1hg+ActHeEO/AGzXCRpdjbCxYyDAOhcwOhXHPT23wmmzaI9H2H9ktzo1wJphg6t9hFUXtnA4XE0kEj4Cx8eLC7DzB4wwMVHHssIJH5Bb06kYAh82j2N1HGDN+RoWP4aLfYg4/gMAN0DQRkZGXHfjOifMEmCnCxhhokvVwx/zqU2UJ2iThycJf+cOWCt3w+IeoPoQr/ttfOgEcrfteDzexV4pS9NMHgLsiIBxEgmCVC/buKi7ECXeAqipSqVCoB63I/R1JGD7DebC4b6HsPpDXFHjqKCRnp6erYGBgSBh82bwOAi8qwgYQWKo8xJyXKzbAKgLaUcSx2dQ/o486q+onsnTdKiOB2wf6MaxGO/t7R3H+/sO1r9C8FB5FbgcJ70K0u04NMIl1WL6mAsPEO/xeQDVYQJHW36A46+DtAx3eoL9T1AFcxwY77S2tC7SDe16iHUL4UNy+jXeacBniBBA/k5/f38ejsjENchcz3M4zlbG4n1eTkLFchaweDmQt01wGudCymazXN9COKsAJnd6ODh6EosMQtscjr3EMSbfc3WQ5i5Km1mX7RsTdfeL1DfHAdEYHC+ChhtFI43iyuds5340chANP9LqHJFIJOOBuV9IbrUPkPchzO+Z/wlOm8RrbuF3Krgg8lhfxvtYxvvJwH0Ii9dzy7S7FyfAOtspj6IL5Sxnpf8JMACmSgtFZUWdJgAAAABJRU5ErkJggg==';
export default image;