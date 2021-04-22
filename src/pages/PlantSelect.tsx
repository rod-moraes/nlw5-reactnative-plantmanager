import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { Button } from "../components/Button";
import {Load} from "../components/Load";
import colors from "../styles/colors";
import { Header } from "../components/Header";
import fonts from "../styles/fonts";
import { EnvironmentButton } from "../components/EnvironmentButton";
import api from "../services/api";
import { PlantCardPrimary } from "../components/PlantCardPrimary";

interface EnvironmentProps {
  key: string;
  title: string;
}
interface PlantsProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string;
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [filteredPlants,setFilteredPlants] = useState<PlantsProps[]>([]);
  const [environmentsSelected, setEnvironmentsSelected] = useState("all");
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [loadingMore,setLoadingMore] = useState(false);
  const [loadedAll,setLoadedAll] = useState(false)

  function handleEnvironmentSelected(environments: string){
    setEnvironmentsSelected(environments);
    if(environments=="all"){
      return setFilteredPlants(plants)
    }
    const filtered = plants.filter(plant=> plant.environments.includes(environments))
    setFilteredPlants(filtered);
  }
  async function fetchPlants() {
    const { data } = await api.get("plants", {
      params: {
        _sort: "name",
        _order: "asc",
        _page:page,
        _limit:8
      },
    });
    if(!data){
      return setLoading(true);
    }
    if(page>1){
      setPlants(oldValue=>[...oldValue,...data])
      setFilteredPlants(oldValue=>[...oldValue,...data])
    }else{
      setPlants([...data]);
      setFilteredPlants([...data])
    }
    setLoading(false)
    setLoadingMore(false)
  }

  function handleFetchMore(distance: number){
    if(distance<1){
      return;
    }
    setLoadingMore(true);
    setPage(oldValue => oldValue+1);
    fetchPlants();
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get("plants_environments", {
        params: {
          _sort: "title",
          _order: "asc",
        },
      });
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }
    fetchEnvironment();
  }, []);
  useEffect(() => {
    fetchPlants();
  }, []);

  if(loading){
    return <Load/>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              key={item.key}
              active={item.key === environmentsSelected}
              onPress={()=>handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentsList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd})=>{handleFetchMore(distanceFromEnd)}}
          ListFooterComponent={
            loadingMore?
            <ActivityIndicator color={colors.green}/> : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentsList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    paddingRight: 32,
    marginVertical: 31,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});