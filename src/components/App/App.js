import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import './App.css';
import { getParamFromUrl } from '../../helpers/webHelpers';

function App() {
  try {
    // 01. Read the param from the url
    var param = getParamFromUrl('key');

    // 02. Request data
    var	data = _requestData(param);
  } catch (error) {
    return _onError(error.message);
  }

  // 03.
  var configuration = _guessConfiguration(data);

  return (
    <Box color="text.primary">
      <Grid container direction="row" justify="center" alignItems="center" >
        <EnhancedTable data={ data } configuration={ configuration }/>
      </Grid>
    </Box>
  );
}

export default App;

/***************************************************/
/**************** Private Functions ****************/
/***************************************************/
function _requestData(key){
  try {
    if (!key) throw new Error('Δεν έχει δωθεί κανένα κλειδί');

    key = key.toLowerCase();

    var data;

    // TODO -> The following wil be replaced with a request
    switch (key){
      case 'employees':
        data = [{
          "Όνομα"   : "Name 1",
          "Επώνυμο" : "Surname 1",
          "Ηλικία"  : 46
        },{
          "Όνομα"   : "Name 2",
          "Επώνυμο" : "Surname 2",
          "Ηλικία"  : 34
        }];
      break;
      case 'products':
        data = [{
          "Ονομασία"    : "Product 1",
          "Description" : "Description for product 1",
          "Price"       : 1200
        },{
          "Ονομασία"    : "Product 2",
          "Description" : "Description for product 2",
          "Price"       : 1800
        }];
      break;
      case 'emptylist':
        throw new Error('Δεν υπάρχουν δεδομένα.');
      default:
        throw new Error('Δεν υπάρχουν δεδομένα.');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

function _guessConfiguration(data){
  return {
    fields  : _guessFields(data),
    columns : _guessColumns(data),
    line    : null
  }
}

/**
 * Η βοηθητική αυτή function χρησιμοποιείται για να δημιουργήσει
 * @param {[{Object}, ...{Object}]} data Ένα array από Objects , π.χ. [{
 *                                                    "Ονομασία"    : "PBS",
 *                                                    "description" : "Λογιστική Σουίτα",
 *                                                    "price"       : 1200
 *                                                  },{
 *                                                    "Ονομασία"    : "PBS ONE",
 *                                                    "description" : "Πλήρης Λογιστική Σουίτα",
 *                                                    "price"       : 1800
 *                                                  }]
 */
function _guessColumns(data){
  var baseRow = data[0],
    columns = [];

  for (var aProperty in baseRow){
    columns.push({
      id : aProperty,
      numeric: false,
      disablePadding: true,
      label : aProperty
    });
  }

  return columns;
}

/**
 * Η βοηθητική αυτή function χρησιμοποιείται για να δημιουργήσει ένα array με τα properties των δεδομένων.
 * Αυτό το array θα χρησιμεύσει αργότερα, όταν θα θέλουμε να αποτυπώσουμε οπτικά τα data σε ένα table.
 * @param {[{Object}, ...{Object}]} data Ένα array από Objects, π.χ. [{
 *                                                    "Ονομασία"    : "PBS",
 *                                                    "description" : "Λογιστική Σουίτα",
 *                                                    "price"       : 1200
 *                                                  },{
 *                                                    "Ονομασία"    : "PBS ONE",
 *                                                    "description" : "Πλήρης Λογιστική Σουίτα",
 *                                                    "price"       : 1800
 *                                                  }]
 */
function _guessFields(data){
  var baseRow = data[0],
    fields  = [];

  for (var aProperty in baseRow){
    fields.push({
      name : aProperty,
      type : 'string'
    });
  }

  return fields;
}

/***************************************************/
/**************** Error Function ****************/
/***************************************************/
function _onError(errorMessage){
  return (<center style={{margin: 100 +'px'}}><span>:-(</span><br/><br/>Προέκυψε κάποιο σφάλμα:<br/>{errorMessage}</center>);
}