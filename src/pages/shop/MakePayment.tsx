import { Box } from '@chakra-ui/react'
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core'
import { PaymentService } from '../../services/paymentService.service';

function MakePayment() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { userID: 0, description: '', amount: 0, email: '' },
    
        // functions will be used to validate values at corresponding key
        validate: {
            userID: (value) => (value < 1 ? 'Name must have at least 2 letters' : null),
          description: (value) => (value.length < 3 ? 'description is required' : null),
          amount: (value) => (value < 50 ? 'amount must be above 49' : null),
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });
      const paymentService = new PaymentService();
    const payForStuff = async()=>{
        try{
            const response = await paymentService.makePayment({
                amount: form.getValues().amount,
                user_id: form.getValues().userID,
                description: form.getValues().description,
                email: form.getValues().email
            });
            // console.log(response);
            console.log(response?.data);
            if (response) {
                window.location.href = response.data.url;
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
      <Box marginTop={'200px'} display={'flex'} flexDir={'column'} alignItems={'center'} w={'100%'}>
      <form style={{width: '30%'}} onSubmit={form.onSubmit(payForStuff)}>
      <NumberInput
        mt="sm"
        label="Amount"
        placeholder="1000"
        min={0}
        // max={99}
        key={form.key('amount')}
        {...form.getInputProps('amount')}
      />
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
       <NumberInput
        mt="sm"
        label="User ID"
        placeholder="2"
        min={0}
        // max={99}
        key={form.key('userID')}
        {...form.getInputProps('userID')}
      />
      <TextInput
        label="Description"
        placeholder="crypto"
        type='text'
        key={form.key('description')}
        {...form.getInputProps('description')}
      />
      
     
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
      </Box>
    </>
  )
}

export default MakePayment
