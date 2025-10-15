(comment

Problem 1 Thread-last Operator ->>
	Given the invoice defined in invoice.edn in this repo, use the thread-last
	->> operator to find all invoice items that satisfy the given conditions. 
	Please write a function that receives an invoice as an argument and returns 
	all items that satisfy the conditions described below.

Invoice Item Conditions
	-At least have one item that has :iva 19%
	-At least one item has retention :ret_fuente 1%
	-Every item must satisfy EXACTLY one of the above two conditions. 
	 This means that an item cannot have BOTH :iva 19% and retention :ret_fuente 1%.
)



(ns firstProblem)

(def invoice (clojure.edn/read-string
               (slurp "invoice.edn")))

 (defn satisfy-conditions [invoice]
  (->> (:invoice/items invoice)
       (filter (fn [item]
                 (or (some #(= (:tax/category %) :iva) (:taxable/taxes item))
                     (some #(= (:retention/category %) :ret_fuente) (:retentionable/retentions item)))))
       (filter (fn [item]
                 (and (some #(and (= (:tax/category %) :iva)
                                   (= (:tax/rate %) 19))
                            (:taxable/taxes item))
                      (some #(and (= (:retention/category %) :ret_fuente)
                                   (= (:retention/rate %) 1))
                            (:retentionable/retentions item)))))
       (doall)))

(def rta (satisfy-conditions invoice))

(println rta)
