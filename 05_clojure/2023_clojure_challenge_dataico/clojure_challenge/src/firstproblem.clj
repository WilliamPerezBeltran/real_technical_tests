(ns firstProblem)

(def invoice (clojure.edn/read-string
               (slurp "invoice.edn")))

 (println "Items with a tax rate of 19: " (invoice))
