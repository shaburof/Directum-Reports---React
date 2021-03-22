import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { resultDataType } from '../../types/types';
import { dateToString } from '../../services/helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tablecell: {
            fontSize: '.7rem',
        },
        tablerow: {
            cursor: 'pointer'
        }
    }),
);


const Row: React.FC<{ appeal: resultDataType, clickRowHandler: Function }> = ({ appeal, clickRowHandler }) => {
    const classes = useStyles();

    const parseClassifier = (classifier: string) => {
        if (classifier === null) return 'не назначено';
        let classifierNumber = classifier.split(' ')[0];
        if (classifierNumber[classifierNumber.length - 1] === '.') {
            classifierNumber = classifierNumber.slice(0, -1);
        };

        return classifierNumber;
    }

    return (
        <TableRow key={'row.id'} hover className={classes.tablerow} onClick={() => clickRowHandler(appeal.appealNo)}>
            <TableCell className={classes.tablecell} component="th" scope="row" align="right">{parseClassifier(appeal.classifier)}</TableCell>
            <TableCell className={classes.tablecell} component="th" scope="row" align="right">{appeal.channel}</TableCell>
            <TableCell className={classes.tablecell} align="right">{dateToString(new Date(appeal.appealData), true)}</TableCell>
            <TableCell className={classes.tablecell} align="right">{appeal.declarantType}</TableCell>
            <TableCell className={classes.tablecell} align="right">{appeal.appealType}</TableCell>
            <TableCell className={classes.tablecell} align="right">{appeal.status}</TableCell>
            <TableCell className={classes.tablecell} align="right">{appeal.responsible}</TableCell>
            <TableCell className={classes.tablecell} align="right">{appeal.isOpen ? 'открыта' : 'закрыта'}</TableCell>
            <TableCell className={classes.tablecell} align="right">{appeal.expired.isExpired ? 'да' : 'нет'}</TableCell>
        </TableRow>
    )
}

export { Row };