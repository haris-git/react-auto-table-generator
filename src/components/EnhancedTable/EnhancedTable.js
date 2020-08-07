import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead';

/***************************************************/
/**** Functions for sorting the table elements *****/
/***************************************************/
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const { data, configuration } = props;
  const fields                  = configuration.fields;
  const classes                 = useStyles();
  const [order, setOrder]       = React.useState('asc');
  const [orderBy, setOrderBy]   = React.useState('Ηλικία');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              configuration={configuration}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  var items = [];
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row[fields[0].name]}>
                      {
                        fields.forEach((field, index2) => {
                          if (index2 === 0) {
                            items.push(<TableCell key={field.name + '-' + index} component="th" id={labelId} scope="row">{row[field.name]}</TableCell>);
                          } else {
                            items.push(<TableCell key={field.name + '-' + index}>{row[field.name]}</TableCell>);
                          }
                        })
                      }

                      {items}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

EnhancedTable.propTypes = {
  data: PropTypes.array.isRequired,
  configuration: PropTypes.object.isRequired,
};