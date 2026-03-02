import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

function ProductGrid({ products, onEdit, onDelete }) {
  return (
    <Grid container spacing={3}>
      {products.length > 0 ? (
        products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{p.name}</Typography>
                <Typography color="text.secondary">Price: ${p.price}</Typography>
                <Typography color="text.secondary">Qty: {p.quantity}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => onEdit(p)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => onDelete(p.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No products found
        </Typography>
      )}
    </Grid>
  );
}

export default ProductGrid;
