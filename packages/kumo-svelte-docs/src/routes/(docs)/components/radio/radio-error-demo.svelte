<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";
</script>

<div class="grid gap-6 md:grid-cols-2">
  <RadioGroup legend="Payment method" error="Please select a payment method to continue">
    <RadioItem label="Credit Card" value="card" variant="error" />
    <RadioItem label="PayPal" value="paypal" variant="error" />
  </RadioGroup>

  <RadioGroup legend="Payment method" appearance="card" error="Please select a payment method to continue">
    <RadioItem
      label="Credit Card"
      description="Pay with Visa, Mastercard, American Express, or Elo."
      value="card"
      variant="error"
    />
    <RadioItem label="PayPal" description="Pay with your PayPal account." value="paypal" variant="error" />
  </RadioGroup>
</div>
