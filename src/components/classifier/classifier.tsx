import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { fetchData } from '../../core/fetchData';
import { Context } from '../../containers/App';
import AddIcon from '@material-ui/icons/Add';
import { ClassifierModal } from './classifierModal';
import { ClassifierAddModal } from './classifierAddModal';
import { EditableRow } from './editableRow';
import { Row } from './row';
import { isRoleAllow } from '../../services/helper';
import { roleEnum } from '../../types/enums';


export type classifierType = { id: number, typeNumber: string, title: string, considerationTime: number, considerationDayType: string };

const Classifier: React.FC = (props) => {

    let store = React.useContext(Context);
    let [open, setOpen] = React.useState(false);
    let [openAddModal, setOpenAddModal] = React.useState(false);
    let [row, setRow] = React.useState<classifierType>({ id: 0, typeNumber: '', title: '', considerationTime: 0, considerationDayType: '' });
    let [editRowId, setEditRowId] = React.useState<number | null>(null);


    React.useEffect(() => {
        (async () => {
            if (store.classifiers.length > 1) return;
            store.setLoading(true);
            let result = await fetchData({ url: 'classifier', method: 'GET' });
            store.setClassifiers(result.data);
            store.setLoading(false);
        })();
    }, []);

    let cellTableheadStyle = { color: 'white', backgroundColor: '#3f51b5' };

    let addHandler = async ({ typeNumber, title, considerationTime, considerationDayType }: { typeNumber: string, title: string, considerationTime: string, considerationDayType: string }) => {
        let result = await fetchData({ url: 'classifier', data: { typeNumber, title, considerationTime, considerationDayType } });
        console.log('result: ', result);
        if (result.status === true) {
            store.setClassifiers([{ id: 989, typeNumber, title, considerationTime: +considerationTime, considerationDayType }, ...store.classifiers]);
        } else {
            return showMessage({ text: 'не удалось добавить классификатор. ', message: result.message });
        }

    }

    let updateHandler = async ({ id, typeNumber, title, considerationTime, considerationDayType }: { id: number, typeNumber: string, title: string, considerationTime: number, considerationDayType: string }) => {
        let result = await fetchData({ url: `classifier/${id}`, method: 'PUT', data: { title, considerationTime, considerationDayType } });
        if (result.status === true) {
            let updateClassifiers = store.classifiers.map(item => {
                if (item.id === id) return { id: id, typeNumber: typeNumber, title: title, considerationTime: considerationTime, considerationDayType: considerationDayType }
                else return item;
            });
            store.setClassifiers(updateClassifiers);
        } else {
            return showMessage({ text: 'не удалось обновить классификатор. ', message: result.message });
        }
    }

    let openDialod = (row: classifierType) => {
        setRow(row);
        setOpen(true);
    }

    let openAddDialog = () => {
        setOpenAddModal(true);
    }

    let removeHandler = async (id: number) => {
        let result = await fetchData({ url: `classifier/${id}`, method: 'DELETE' });
        if (result.status === true) {
            let filteredClassifiers = store.classifiers.filter(item => item.id !== id);
            store.setClassifiers(filteredClassifiers);
        } else {
            return showMessage({ text: 'не удалось удалить классификатор. ', message: result.message });
        }
    }

    let showMessage = ({ text, message }: { text: string, message: string }) => {
        store.setMessage({ type: 'error', text: text + message, isActive: true, autoClose: true });
    }

    let generateRow = () => {
        if (store.loading) return false;
        return store.classifiers.map((row) => {
            if (row.id === editRowId && isRoleAllow({ userRole: store.user.role, allowFor: roleEnum.POWERUSER })) return <EditableRow row={row} key={row.id} setEditRowId={setEditRowId} updateHandler={updateHandler} />
            return <Row row={row} key={row.id} userRole={store.user.role} openDialod={openDialod} setEditRowId={setEditRowId} />
        });
    }

    return <React.Fragment>
        <ClassifierAddModal open={openAddModal} setOpen={setOpenAddModal} handler={addHandler} />
        <ClassifierModal open={open} setOpen={setOpen} row={row} handler={removeHandler} />
        <Typography variant='h4' align="center" style={{ marginBottom: '20px', color: '#616161' }}>справочник обращений клиентов</Typography>
        <Divider variant="middle" style={{ marginBottom: '30px' }} />
        {isRoleAllow({ userRole: store.user.role, allowFor: roleEnum.POWERUSER })
            ? <Grid container style={{ marginBottom: '20px' }} justify="flex-start">
                <Button startIcon={<AddIcon />} size="small" style={cellTableheadStyle} variant="contained" onClick={openAddDialog}>добавить</Button>
            </Grid>
            : ''
        }
        <TableContainer component={Paper} style={{ maxHeight: '70vh' }}>
            <Table stickyHeader aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={cellTableheadStyle}>номер</TableCell>
                        <TableCell style={cellTableheadStyle} align="center">классификатор обращения</TableCell>
                        <TableCell style={cellTableheadStyle} align="right">срок рассмотрения (дней)</TableCell>
                        <TableCell style={cellTableheadStyle} align="center">тип</TableCell>
                        {store.user.role !== 'USER'
                            ? <TableCell style={cellTableheadStyle} align="center">операции</TableCell>
                            : ''
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {store.classifiers && generateRow()}
                </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment >
}

export default Classifier;