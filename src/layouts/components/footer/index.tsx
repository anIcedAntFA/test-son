import { Link, Stack, Typography } from '@mui/material';

import { MyTooltip } from 'src/components/ui';
import { FOOTER_ICONS_LIST } from 'src/configs';

function Footer() {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ mx: '24px' }}>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Typography variant="body1">Copyright © 2023 - Built with</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {FOOTER_ICONS_LIST.map((item, index) => (
            <MyTooltip key={index} title={item.title} color={item.color}>
              <Link component="button" href={item.path} target="_blank">
                {item.icon}
              </Link>
            </MyTooltip>
          ))}
          <Typography>by</Typography>
          <Link href={''} target="_blank" underline="hover">
            ngockhoi96
          </Link>
        </Stack>
      </Stack>
      <Stack direction="column" alignItems="center">
        <Typography variant="body1">Find an issue with this app?</Typography>
        <Link href={''} target="_blank" underline="hover">
          Fix it on Github
        </Link>
      </Stack>
    </Stack>
  );
}

export default Footer;
