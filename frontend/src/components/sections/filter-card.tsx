import { useEffect } from "react";
import fitlerData from "@/utils/filter-data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { searchSchema, SearchSchemaTS } from "@/schemas/SearchZodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setSearchJobByText } from "@/redux/slice/jobSlice";

const FilterCard = () => {
  const dispatch = useAppDispatch();
  const form = useForm<SearchSchemaTS>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keyword: "All", // ✅ set default
    },
  });

  useEffect(() => {
    dispatch(setSearchJobByText("All"));
  }, [dispatch]);

  return (
    <div>
      <h1>Filter Jobs</h1>
      <hr className="mt-3" />
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      dispatch(setSearchJobByText(value));
                    }}
                  >
                    {fitlerData.map((data, index) => (
                      <div key={index}>
                        <h2 className="text-lg font-bold">{data.fitlerType}</h2>
                        <div className="space-y-2">
                          {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                              <FormItem
                                key={itemId}
                                className="flex items-center space-y-0 space-x-3"
                              >
                                <FormControl>
                                  <RadioGroupItem value={item} id={itemId} />
                                </FormControl>
                                <FormLabel
                                  htmlFor={itemId}
                                  className="font-normal"
                                >
                                  {item}
                                </FormLabel>
                              </FormItem>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default FilterCard;
