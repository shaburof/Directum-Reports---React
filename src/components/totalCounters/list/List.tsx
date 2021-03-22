import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

// Example
{/* <List width={5} title='обращения' data={[
    { name: 'всего', value: store.result.totalAppeals + ' шт.' },
]} /> */}


const List: React.FC<{ title: string, data: { name: string, value: any, link?: string }[], width: number }> = ({ title, data, width }) => {

    let sort = (a: any, b: any) => {
        if (data[a] < data[b]) return 1;
        else if (data[a] > data[b]) return -1;
        return 0;
    }

    let paramName = (index: number): string => {
        return data[index].name.toLowerCase();
    }

    let paramValue = (index: number) => {
        return data[index].link ? <Link href={data[index].link} color="primary" underline="always">{data[index].value} </Link> : data[index].value
    }

    return <Grid item md={width as any} xs={12}>
        <Paper elevation={0} style={{ backgroundColor: 'transparent' }}>
            <Typography variant='body2' align="center" style={{ color: '#424242' }}>{title}</Typography>
            <Divider variant="middle" />
            <Box mt={2} />
            {Object.keys(data).map((index, i) => {
                return <Grid container spacing={0} key={i}>
                    <Grid item xs={9}>
                        <Typography variant='body2' align="left" style={{ color: '#424242' }}>{paramName(i)}:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='body2' align="right" style={{ color: '#424242' }}>{paramValue(i)}</Typography>
                    </Grid>
                </Grid>
            })}
        </Paper>
    </Grid>
}

export { List };