'use client'

import { useEffect, useState } from "react";
import { orders } from './test';

const Test = () => {
  const [redXl, setRedXl] = useState({
    "Red / XS": 0,
    "Red / S": 0,
    "Red / M": 0,
    "Red / L": 0,
    "Red / XL": 0,
    "Red / XXL": 0,
    'Red / 2XL': 0,
    'Red / 3XL': 0,
  });

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [WhiteXl, setWhiteXl] = useState({
    "White / XS": 0,
    "White / S": 0,
    "White / M": 0,
    "White / L": 0,
    "White / XL": 0,
    "White / XXL": 0,
    'White / 2XL': 0,
    'White / 3XL': 0,
  });

  const [totalQuantityWhite, setTotalQuantityWhite] = useState(0);

  // Function to get total quantity by SKU and update sizes
  const getTotalQuantityBySKU = (orders, targetSKU) => {
    let total = 0;
    let totalWhite = 0;
    // Create a copy of the current state to update
    const updatedRedXl = { ...redXl };
    const updatedWhiteXl = { ...WhiteXl };

    // Loop through each order in the list
    orders.data.orders.edges.forEach(order => {
      // Loop through each line item in the order
      order.node.lineItems.edges.forEach(item => {
        const lineItem = item.node;

        // Check if the SKU matches the target SKU
        if (lineItem.sku === targetSKU) {
          // Get the variant size option
          const sizeOption = lineItem.variant.selectedOptions.find(option => option.name === 'Size');
          const size = sizeOption ? sizeOption.value : '';

          // If size exists, check if it's in the "Red / Size" format or just "Size"
          const fullSizeKey = `Red / ${size}`;

          if (updatedRedXl[fullSizeKey] !== undefined) {
            // If "Red / Size" exists in redXl, add to it
            updatedRedXl[fullSizeKey] += lineItem.quantity;
          } else if (updatedRedXl[size] !== undefined) {
            // If only "Size" exists in redXl, add to it
            updatedRedXl[size] += lineItem.quantity;
          }

          // Add to the total quantity
          total += lineItem.quantity;
        }
        if (lineItem.sku === '777706 02') {
          // Get the variant size option
          const sizeOption = lineItem.variant.selectedOptions.find(option => option.name === 'Size');
          const size = sizeOption ? sizeOption.value : '';

          // If size exists, check if it's in the "Red / Size" format or just "Size"
          const fullSizeKey = `White / ${size}`;

          if (updatedWhiteXl[fullSizeKey] !== undefined) {
            // If "Red / Size" exists in redXl, add to it
            updatedWhiteXl[fullSizeKey] += lineItem.quantity;
          } else if (updatedWhiteXl[size] !== undefined) {
            // If only "Size" exists in redXl, add to it
            updatedWhiteXl[size] += lineItem.quantity;
          }

          // Add to the total quantity
          totalWhite += lineItem.quantity;
        }
      });
    });

    // Update the state with the new quantities and total
    setRedXl(updatedRedXl);
    setTotalQuantity(total);
    setWhiteXl(updatedWhiteXl);
    setTotalQuantityWhite(totalWhite);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getTotalQuantityBySKU(orders, '777696 01');
  }, []);

  return (
    <>
    <div>
      <h2>Total Quantity: {totalQuantity}</h2>
      <p>Red / XS : {redXl['Red / XS']}</p>
      <p>Red / S : {redXl['Red / S']}</p>
      <p>Red / M : {redXl['Red / M']}</p>
      <p>Red / L : {redXl['Red / L']}</p>
      <p>Red / XL : {redXl['Red / XL']}</p>
      <p>Red / XXL : {redXl['Red / XXL']}</p>
      <p>Red / 2XL : {redXl['Red / 2XL']}</p>
      <p>Red / 3XL : {redXl['Red / 3XL']}</p>
    </div>
    <div>
      <h2>Total Quantity: {totalQuantityWhite}</h2>
      <p>White / XS : {WhiteXl['White / XS']}</p>
      <p>White / S : {WhiteXl['White / S']}</p>
      <p>White / M : {WhiteXl['White / M']}</p>
      <p>White / L : {WhiteXl['White / L']}</p>
      <p>White / XL : {WhiteXl['White / XL']}</p>
      <p>White / XXL : {WhiteXl['White / XXL']}</p>
      <p>White / 2XL : {WhiteXl['White / 2XL']}</p>
      <p>White / 3XL : {WhiteXl['White / 3XL']}</p>
    </div>
    </>
  );
};

export default Test;
