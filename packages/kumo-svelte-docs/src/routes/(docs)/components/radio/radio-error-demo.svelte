<script lang="ts">
  import { Radio } from "kumo-svelte";
</script>

<div class="grid gap-6 md:grid-cols-2">
  <Radio.Group legend="Payment method" error="Please select a payment method to continue">
    <Radio.Item label="Credit Card" value="card" variant="error" />
    <Radio.Item label="PayPal" value="paypal" variant="error" />
  </Radio.Group>

  <Radio.Group legend="Payment method" appearance="card" error="Please select a payment method to continue">
    <Radio.Item
      label="Credit Card"
      description="Pay with Visa, Mastercard, American Express, or Elo."
      value="card"
      variant="error"
    />
    <Radio.Item label="PayPal" description="Pay with your PayPal account." value="paypal" variant="error" />
  </Radio.Group>
</div>
