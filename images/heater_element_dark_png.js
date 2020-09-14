/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAA8CAYAAACAc5NXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACQxJREFUeNrsnd1S21YQx49s2YbwEZwhpW2SxjxBw22mMyV3vatz1zvgCQpPQPsEkCcIeYLQJ4iZ6eS25K69iiGTThoKcQMGf2G6/6M9RhjbEraOLMnamY1M/CFL+nl3z57dI0OMqDx+/N0j2sx0ebrXc3YpsnaS3devfy+N2nk1IgjHIm8fkub48QxDMkyxw4ftXvv/E4CFGCh/gFFA5FgVLG4tSdhklxTWbYf/BmglAm43Burm8CwyKA95G1VoBoFtly0cQCsSaMUYqKvwfMuuKhfz0peUGLId3haGFb8ZQwAI+r0t1hmKpNPp1uNEMtn1dRfNpmg0GuL8/DxskBXZgu0wYMXQA0UAweLkGaC87oNJEhimaYpUKiXVJM0QOABmfHycnjdJE/I1hmGQJkiFfCzhuZD/0vZCNAkkKECC4nGtVhN10kq1KqqVijg5OZGvDZGrlIARXNuhAYpHXEsMkBYXBgBgYcbGxqRmSG/dusUgpQmYJMOTlABZ4BgtbVmfiwtWwKO2gOgSJKWNRl3U63VxWi6LGm0B1NnZWRgtl3KRgOo3r+EyPLZEP+uACGBkMhkxTtBMTExIiACUskYWOEmRSCSkAiAFnh0cWB+AoyzO+bnlygBKo4EtWR8CBW4OsOA1+BtbvCZE1qgfuF54kbYwBgRpkSHKa4GIwJmampLuSrowAgiaSAAeg+ExbIdhAYOYp9m8tC7SVQEaWBZ6DGDq9Br8DYkwLP3EXS9IN/sN6o0+QVqmzboulwYrBE2TVZLQADDEPbRtsrWpURzT5FgH7kfFPYAH0uRgOpa+ZYv015sG80aQQLJbp2TbyCu2IuEAy3AJElzbhhj+9EUsw4uznhFUvwwEFE95wCKtxuc0Fo6xnvaaAjIchv/Po2aV4EoR4CM+SyNPlRkTZurqaFGNDBGDQSs04sOo7/j4OKxpAq9ljaDadA0UwZRnmCIxh4YUgwz0JyflFimIdDrDI0cLIpVqsAJ6lXtqyCC/SgMApA+ODg/Fp0+fYpw4tiKoVhyB4sD7eVSOepIgmslmZeoB1ghwpdMpmfgETCrpqXJV9iRmtVoT5fKJzIiXy2WZ1IylN1RGBzf3R5SOGBZpanpaJkORw1IJUBx6rVaVOSmkH5CTwpQKgIKLg3Wqc54qJLFNLghQGW0B+Fuf3ZwK7uLR4+CjsKd87X4UVqLZz+vYiqkStv/0K2bCr2mNdB5D0RgmTwTX7aWwqgpWSLMM2LZP+9/g6TcLKM4z6a4G2CJdoIOdt40QNmIWPIdKCiZ9SQFVln/ARc37X2+5PAIK1mlZI0jXMq2a9zmoFByez4ngFgM+6TbJ68NMx7wC6kLTRVnplLJn8/h2CCfbXqtdssVwA3Wo2JokVO37bTG88uWu5932fVcZLK+/25rB7u6VriCtxy9Fd2qiyCf3DQNTGIa54MHOIsPlZ6VqkbXE58AuD4WekuttU0NQvOCiOyOn8SSi/GI7KB0ibPm27QEyJ451j8bsbjnv0+HmTY8PaGuIF3KXTX3gW424SnKbwFrjOHJdRGRWIuHx5y1zPDEMkUlZ2j90VQ1jAw5WiUODeVs8F2pJPnjwTc5jk/gTfeZf797t/9ntBRr2aZcvSX8gXaX9LJM+Is2SCvpOH4J4Eeh7Vej7fSWG3AkEwdSUavZAnT7mPTNc6OiiYLFgaBxxbXK6oBSgUZ4aBSHW2hMBagP345yoEmpMQ6ECdoxAMblDCNDYu4BUBayagjo9PRX/fPjgVOS4otIGbzUFyiWGarPDCXwVhF+kQ3rB6djedHhP3ykIOidI9HpaewY47ty5I27PzLSaO9AZlEqZrbYyVWmhIELzRr3ekHOdFW4XO/j4UVZd9DpndNwLhk/DeDX6ahW/a0pXBA3KIkNXcGsB6by89DIcAFBzc3NyghwVF5dlO6atyUNcqbRAlcXZ2an4/Pmz+K9UktbJwTLhmmIGpGSfHNZlpa6NBAX3g+n4RQZcANWOU1pDxywCLBO6iMZJAZTBLWcSpqbVl4g2MlghpS5r+HEcT5ShsAPlt8VQ+Rm/Z8aDIrBezzjV0inOxHnZEMGd4ulYZ27o9uGxuLswoksvHIcjSwGKN3v+EAw/zG0URI18NF+olR4TuyrVoqZv/LTqrlx1R6BiqCxB2/uYHEobrcU23u3v+7FrQLXlInhXk885hsyLVfpUGkWtP3XjOdBeXS/wjesjCxQBhKYGbKF/v38vh88+ydNBFrFwWD/0mniZg3Pqy1vkdEJOjLD44O66DsPDdq4SLshdEFbWe2RlCC3wM2ENOVyvbcBmdEMEN7sdNZGZ58gC1eYG12Ow9AsBZUQeqDawluIUQwyUJ0DZwELArm31uoDJmrisW1LDdPvy1zFQXn6YH+trDlkw6lro0nihasdfxkBpEBtciyJazZyoHHjS47gvYqA0C7tFgKWmDcJuvbo2Yow6UKZPwSVcxBZrO2Ba4g/NsiQiUgMeSgt1g1Gjuk1HLuBpiY5uT8PqNQth6OLx3UK5tGIF0dYCzhcoZxtNqce+1k9hLg+CVewcpO/vpZoCUCXpxeeNPFBdIFN3XtruYtGE6Hx/PFfWDXN0qF50knv378tlrPf7rDZQ5bbdBHXcs7OzYnJqSjYEuAA3BkqTRROix8IWHKu1DwhaAovwxdycI3TZbFZeZJTRqnXQbyJf37t3bZlsu2CucHp6WjYPYMnFGKjgQofBALTA5ThXgBrje8Q4u6IJaWH6AQrvx7KM9nvMdAIKd4zAHSKUe42BCqGgF83J5Zmm1beGjpBeVqabWE2TKXkrke5ACV6F2HTlgmOgAirqFma9BNaj/S5WNxXrLldO7+e7ZYX8NtAjDVSVl4x2Asq6AWOjr/gJ73HzPtXmXW/UY6DCKifHx8J0cGNwQRMTk6JSOesLKAD578FBz1GeiucQP/lYZhwD5bVgiH5AF9tplIeGhUFutnh4eOjK/c7evSshj4GKsMDC7O/tOcZag8rR0ZG89UeI1kbvKIkRYqM4iCVrs067PfZR6hfcNpdaEvpX7vVcjBECSk3lLIrL+cKbiFptxWldAkyX5Hkf/Ux679r2E7qul/8FGAAX3ofQmMht+QAAAABJRU5ErkJggg==';
export default image;